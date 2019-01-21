'use strict';

// utility to save extracted rar data to disk

// relies on extractor from 
// https://www.npmjs.com/package/node-unrar-js
// list is: let list = extractor.extractAll();
// TODO: standalone tests
// better async suppport, less memory consumption

const fs = require("fs-extra");
const path = require("path");
const debuglog = require('util').debuglog('unrar-save');

module.exports = function(list, folder) {
  const [state, arcHeader] = list;
  const done = arcHeader.files.map((f) =>
    saveFileOrDir(f, folder)
  );
  return Promise.all(done);
}

function saveFileOrDir(file, folder) {
  const { fileHeader, extract } = file;
  const [state, data] = extract; /*eslint no-unused-vars: "off"*/
  const { name, flags: { directory } } = fileHeader;
  debuglog(`saving:${name}, directory: ${directory}, folder:${folder}`);

  // FIXME: sanitize paths, prevent attacks to abs paths from rar data
  const absPath = folder ? path.resolve(folder, name) : name;

  /*eslint no-else-return: "off"*/
  if (directory) {
    return fs.mkdirp(absPath);
  } else {
    return fs.outputFile(absPath, data, { encoding: null });
  }
}