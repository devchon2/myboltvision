const { createRequire } = require('module');
const { pathToFileURL } = require('url');

exports.importModule = async function (id) {
  return import(pathToFileURL(id).href);
};
