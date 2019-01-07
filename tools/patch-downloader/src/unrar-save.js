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
  let [state, arcHeader] = list;
  let done = arcHeader.files.map((f) =>
    saveFileOrDir(f, folder)
  );
  return Promise.all(done);
}

function saveFileOrDir(file, folder) {
  let { fileHeader, extract } = file;
  let [state, data] = extract;
  let { name, flags: { directory } } = fileHeader;
  debuglog(`saving:${name}, directory: ${directory},folder:${folder}`);
  
  // FIXME: sanitize paths, prevent attacks to abs paths from rar data
  let absPath = folder ? path.resolve(folder, name) : name;

  if (directory) {
    return fs.mkdirp(absPath);
  } else {
    return fs.outputFile(absPath, data, { encoding: null });
  }
}