const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('⚡ Running pre-start tasks...');

// Run the remix-patch.js file
try {
  console.log('🔧 Applying Remix patches...');
  execSync('node remix-patch.js', { stdio: 'inherit' });
  console.log('✅ Remix patches applied successfully');
} catch (error) {
  console.error('❌ Failed to apply Remix patches:', error.message);
}

// Replace the problematic function in server.js directly
try {
  const serverRuntimePath = path.join(__dirname, 'node_modules', '@remix-run', 'server-runtime', 'dist', 'server.js');

  if (fs.existsSync(serverRuntimePath)) {
    console.log('🔍 Fixing handleDocumentRequestFunction issue...');

    let content = fs.readFileSync(serverRuntimePath, 'utf8');

    // Replace the problematic handleDocumentRequest function
    const patchedFunction = `
async function handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext) {
  // Direct implementation instead of using handleDocumentRequestFunction
  const markup = await renderToHTML(request, entryContext, loadContext);
  return new Response(markup, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}`;

    if (content.includes('handleDocumentRequestFunction(')) {
      content = content.replace(
        /async function handleDocumentRequest\([^{]*{[\s\S]*?handleDocumentRequestFunction\([^}]*}/,
        patchedFunction,
      );

      fs.writeFileSync(serverRuntimePath, content);
      console.log('✅ handleDocumentRequestFunction issue fixed');
    } else {
      console.log('ℹ️ No need to patch handleDocumentRequestFunction');
    }
  } else {
    console.log('⚠️ Server runtime file not found');
  }
} catch (error) {
  console.error('❌ Failed to fix handleDocumentRequestFunction issue:', error.message);
}

console.log('⚡ Pre-start tasks completed');

const getGitHash = () => {
  try {
    // Attempt to use execSync, but provide a fallback if it fails.
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    // Return a default value when git is not available.
    return 'no-git-info';
  }
};

let commitJson = {
  hash: JSON.stringify(getGitHash()),
  version: JSON.stringify(process.env.npm_package_version),
};

console.log(`
★═══════════════════════════════════════★
          B O L T . D I Y
         ⚡️  Welcome  ⚡️
★═══════════════════════════════════════★
`);
console.log('📍 Current Version Tag:', `v${commitJson.version}`);
console.log('📍 Current Commit Version:', commitJson.hash);
console.log('  Please wait until the URL appears here');
console.log('★═══════════════════════════════════════★');
