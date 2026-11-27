// Reads .env (or .env.example) and writes src/env.js for the browser.
// Only PUBLIC values are exported - secrets never reach the client.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const file = [".env", ".env.example"].map(f => path.join(root, f)).find(fs.existsSync);
const PUBLIC = ["APP_NAME","APP_ENV","APP_VERSION","API_BASE_URL","BANNER_ENABLED",
  "BANNER_MESSAGE","BANNER_MAINTENANCE_START","BANNER_MAINTENANCE_END"];
const env = {};
fs.readFileSync(file, "utf8").split(/\r?\n/).forEach(line => {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*([^#]*?)\s*(?:#.*)?$/);
  if (m && PUBLIC.includes(m[1])) env[m[1]] = m[2];
});
fs.writeFileSync(path.join(root, "src", "env.js"),
  "window.__ENV__ = " + JSON.stringify(env, null, 2) + ";\n");
console.log("Wrote src/env.js from", path.basename(file));
