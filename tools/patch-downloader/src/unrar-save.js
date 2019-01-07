'use strict';

// utility to save extracted rar data to disk

// relies on extractor from 
// https://www.npmjs.com/package/node-unrar-js
// TODO: standalone tests
// better async suppport, less memory consumption

const fs = require("fs-extra");
const path = require("path");
const debuglog = require('util').debuglog('unrar-save');

module.exports = function(extractor, cwd) {
  let list = extractor.extractAll();
  let [state, arcHeader] = list;
  let done = arcHeader.files.map((f) =>
    saveFileOrDir(f, cwd)
  );
  return Promise.all(done);
}

function saveFileOrDir(file, cwd) {
  let { fileHeader, extract } = file;
  let [state, data] = extract;
  let { name, flags: { directory } } = fileHeader;
  debuglog(`saving:${name}, directory: ${directory},cwd:${cwd}`);
  
  // FIXME: sanitize paths, prevent attacks to abs paths from rar data
  let absPath = cwd ? path.resolve(cwd, name) : name;

  if (directory) {
    return fs.mkdirp(absPath);
  } else {
    return fs.outputFile(absPath, data, { encoding: null });
  }
}