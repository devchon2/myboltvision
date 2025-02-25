const { execSync } = require('child_process');

// Get git hash with fallback
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
