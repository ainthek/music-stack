'use strict'
/*global describe:true,it:true,	after:true,before:true,afterEach:true,beforeEach:true */
const base = "https://guitarpatches.com";
const request = require("request-promise-native");
const parseContentDisposition = require("content-disposition").parse;
const path = require("path");
const assert = require("assert");
const unrar = require("node-unrar-js");
const save = require("../src/unrar-save.js");
const isPromise = require("util").types.isPromise;
const gp = require("../src/guitarpatches");

describe("tests and POCs", function() {
  it.skip("supports async listing of units()", () => {
    let units = gp.units();
    assert(isPromise(units));
    return units.then((units) => {
      console.error(units);
      assert(Array.isArray(units), "shell return array");
      assert(units.length > 0);
      assert(units.every(u => u.name && u.link), "of objects with name and link")
    })
  });
  it.only("supports async listing of patches for given unit", function() {
    this.timeout(10000);
    let unit = { name: 'G2Nu and G2.1Nu', link: 'patches.php?unit=G2Nu' };
    let patches = gp.patches(unit);
    return patches.then((patches) => {
      console.error(patches);
      assert(Array.isArray(patches), "shell return array");
      assert(patches.length > 0);
      assert(patches.every(p =>
        p.name && p.link && p.id
      ), "of objects with these properties")
    })
    return patches;
  });
  it.skip("supports paged async listing of all patches(,true) for given unit", function() {
    this.timeout(10000);
    let unit = { name: 'G2Nu and G2.1Nu', link: 'patches.php?unit=G2Nu' };
    let pages = gp.patches(unit, true);
    console.log(pages);
    return pages.then((pages)=>console.log(pages));
    // assert(Array.isArray(pages), "shell return array");
    // assert(pages.every(p => isPromise(p)), "of promises");

    // pages.forEach(page => page.then(() => {
    //   assert(Array.isArray(page), "shell return array");
    //   assert(page.every(p =>
    //     p.name && p.link && p.id
    //   ), "of objects with these properties")
    // }));

    // return Promise.all(pages);
  });
  it("rar response", function() {

    return request.get(`${base}/download.php??mode=download&unit=G2Nu&ID=9892`, {
        resolveWithFullResponse: true,
        encoding: null
      })
      .then((resp) => {
        let { headers, body } = resp;
        assert.equal(headers["content-type"], 'application/octet-stream');
        let cd = parseContentDisposition(headers["content-disposition"]);
        let ext = path.extname(cd.parameters.filename);
        //console.log(ext);
        assert(Buffer.isBuffer(body));
        let extractor = unrar.createExtractorFromData(body);
        let list = extractor.extractAll();
        let [state, arcHeader] = list;
        //console.log(list);
        save(extractor);
      });
  });

  it.skip("xml response", function() {

    return request.get(`${base}/download.php??mode=download&unit=G2Nu&ID=9906`, {
        resolveWithFullResponse: true,
        encoding: null
      })
      .then((resp) => {
        let { headers, body } = resp;
        assert.equal(headers["content-type"], 'application/octet-stream');
        let cd = parseContentDisposition(headers["content-disposition"]);
        let ext = path.extname(cd.parameters.filename);
        console.log(ext);
      });
  });

});