'use strict'
/*global describe:true,it:true,	after:true,before:true,afterEach:true,beforeEach:true */
const base = "https://guitarpatches.com";
const request = require("request-promise-native");

const path = require("path");
const assert = require("assert");
const unrar = require("node-unrar-js");
const save = require("../src/unrar-save.js");
const isPromise = require("util").types.isPromise;
const gp = require("../src/guitarpatches");
const parseContentDisposition = require("content-disposition").parse;

describe("tests and POCs", function() {
  it.only("supports async listing of units()", () => {
    let units = gp.units();
    assert(isPromise(units));
    return units.then((units) => {
      console.error(units);
      assert(Array.isArray(units), "shell return array");
      assert(units.length > 0);
      assert(units.every(u => u.name && u.link && u.unit), "of objects with name and link")
    })
  });
  it("supports async listing of ALL patches for given unit", function() {
    this.timeout(10000);
    let unit = { name: 'G2Nu and G2.1Nu', link: 'patches.php?unit=G2Nu' };
    let patches = gp.patches(unit);
    return patches.then((patches) => {

      assert(Array.isArray(patches), "shell return array");
      assert(patches.length > 0);
      console.error("#of patches:", patches.length)
      assert(patches.every(p =>
        p.name && p.link && p.id
      ), "of objects with these properties")
    })
    return patches;
  });
  it("supports PAGED async listing of patches(,true) for given unit", async function() {
    this.timeout(10000);
    let unit = { name: 'G2Nu and G2.1Nu', link: 'patches.php?unit=G2Nu' };
    let pages = await gp.patches(unit, true); // promise of [] of promises 
    assert(Array.isArray(pages) && pages.every(isPromise),
      "shell return array of promises"
    );
    return Promise.all(pages).then((pages) => {
      pages.forEach(page => {
        assert(Array.isArray(page));
        page.forEach(patch => {
          assert(patch.name && patch.link && patch.id);
        })
      })
    });
  });
  it("supports download of XML files", function() {
    let patch = gp.download({ unit: "G2Nu" }, { id: "9906" });
    patch.then((p) => {
      console.log(p);
    })
    return patch;
  });
  it("supports download of RAR files", function() {
    let patch = gp.download({ unit: "G2Nu" }, { id: "9892" });
    patch.then((p) => {
      console.log(p);
    })
    return patch;
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
        console.log(arcHeader);
        //save(list);
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