'use strict'

const gp = require("./src/guitarpatches.js");
const path = require("path");
const out = path.join(__dirname, "out");

const unit = {
  name: 'G2Nu and G2.1Nu',
  link: 'patches.php?unit=G2Nu',
  unit: 'G2Nu'
};
/*
gp.patches(unit)
  .then((patches) => patches.find((patch) => patch.id === "9906"))
  .then((patch) => gp.downloadAndSave(unit, patch, out))
  .then(console.log)

gp.patches(unit)
  .then((patches) => patches.find((patch) => patch.id === "9892"))
  .then((patch) => gp.downloadAndSave(unit, patch, out))
  .then(console.log)
*/
// trim sample
// gp.patches(unit)
//   .then((patches) => patches.find((patch) => patch.id === "5819"))
//   .then((patch) => gp.downloadAndSave(unit, patch, out))
//   .then(console.log)


gp.patches(unit, true).then(pages => {
  pages.map(page => {
    page.then(patches => {
      console.log("page ready");
      return patches.map((patch) =>
        gp.downloadAndSave(unit, patch, out)
        .then(() => console.log("patch downloaded:", patch.id))
      )
    })
  });
});