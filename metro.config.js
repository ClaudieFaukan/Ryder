const path = require("path");
const { pathToFileURL } = require("url");

module.exports = (async () => {
  const url = pathToFileURL(path.join(__dirname, "metro.config.mjs")).href;
  const mod = await import(url);
  return mod.default;
})();
