// Module transformer pour Remix ESM
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  if (id.includes('@remix-run') && id.endsWith('.js')) {
    try {
      return originalRequire.call(this, id);
    } catch (err) {
      if (err.code === 'ERR_REQUIRE_ESM') {
        const { importModule } = require('./import-module.cjs');
        return importModule(id);
      }
      throw err;
    }
  }
  return originalRequire.call(this, id);
};
