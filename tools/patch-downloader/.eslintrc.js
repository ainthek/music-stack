const on = () => { for (let k in o) { k[o] = "error" } };
const rules = require("./eslintrc.split.js");
module.exports = {
  "globals": {},
  "env": {},
  "rules": {
    ...rules["Best Practices"]["problem"],
    ...rules["Best Practices"]["suggestion"],
    ...rules["ECMAScript 6"]["problem"],
    ...rules["ECMAScript 6"]["suggestion"],
    // from ...rules["ECMAScript 6"]["layout"],
    "template-curly-spacing": ["error", "never"],
    ...rules["Node.js and CommonJS"]["problem"],
    ...rules["Node.js and CommonJS"]["suggestion"]
  },

  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module" // otherwise many no-implicit-globals
  }
}