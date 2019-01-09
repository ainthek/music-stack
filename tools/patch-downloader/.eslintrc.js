const on = () => { for (let k in o) { k[o] = "error" } };
const rules = require("./eslintrc.split.js");
module.exports = {
  "globals": {},
  "env": {},
  "rules": {
    ...rules["Best Practices"]["problem"],
    ...rules["Best Practices"]["suggestion"]
  },

  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module" // otherwise many no-implicit-globals
  }
}