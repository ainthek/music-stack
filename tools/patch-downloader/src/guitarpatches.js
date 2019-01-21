// wrapper over web site https://guitarpatches.com/
// usable to implement downloads and online APIs over the patches

const request = require("request-promise-native");
const retry = require("./retry.js");
const cheerio = require("cheerio");
const { URL } = require("url");
const parseContentDisposition = require("content-disposition").parse;
//
const path = require("path");
const unrar = require("node-unrar-js");
const unrarSave = require("./unrar-save.js")
const fs = require("fs-extra");
// -------------------------------------------------------
const base = "https://guitarpatches.com"

const parseHtml = (str) => cheerio.load(str);
const array = (s, e) => { // TODO: better
  const seqGen = function*(s, e) { for (let i = s; i <= e; i++) yield i; };
  return Array.from(seqGen(s, e))
};
const concat = (arrays) => arrays.reduce((p, c) => p.concat(c), []);
// -------------------------------------------------------
const parseUnits = ($) => $("H2")
  .map((i, e) => {
    const link = $(e).parent().attr("href");
    return {
      name: $(e).text(),
      link: link,
      unit: new URL(link, base).searchParams.get("unit")
    }
  }).get();

const units = () => request.get(`${base}/units.php`)
  .then(parseHtml)
  .then(parseUnits)
// -------------------------------------------------------

const getPage = (unit, page = 1) =>
  request.get(`${base}/${unit.link}&page=${page}`).then(parseHtml);

const parsePageCount = ($) =>
  Number($(".paginate *:nth-last-child(2)").text());

async function patches(unit, paged = false) {
  //https://guitarpatches.com/patches.php?unit=G2Nu
  const getUnitPage = (p) => getPage(unit, p);

  const first = await getUnitPage(1);
  const count = parsePageCount(first);
  // 
  const others = array(2, count).map(getUnitPage);
  const pages = [first, ...others].map((p) => Promise.resolve(p)
    .then(parsePatchTable)
  );


  return paged ? pages : Promise.all(pages).then(concat);

}

function parsePatchTable($) {

  return $("table.lists").first()
    .find("tbody>tr").map(parseTr).get();

  function parseTr(i, tr) {
    const link = $("TD:nth-child(1) a", tr).attr("href");
    const id = new URL(link, base).searchParams.get("ID");
    return {
      name: $("TD:nth-child(1)", tr).text().trim(),
      link: link,
      id: id,
      artist: $("TD:nth-child(2)", tr).text().trim(),
      rating: $("TD:nth-child(3)", tr).text().trim(),
      date: $("TD:nth-child(6)", tr).text().trim(),
      uploader: $("TD:nth-child(7)", tr).text().trim(),
    }
  }
}
// -------------------------------------------------------
const downloadPool = { maxSockets: 10 };

function download(unit, patch) {
  // TODO: get rid of unit
  // mode=download seems useles
  return request.get(`${base}/download.php?unit=${unit.unit}&ID=${patch.id}`, {
      resolveWithFullResponse: true,
      encoding: null,
      pool: downloadPool
    })
    .then(parseAttachment)
    .then((attachment) => ({ unit, patch, attachment }));
}

function downloadAndSave(unit, patch, folder = process.cwd()) {
  // this shelk be moved somewhere else probably
  return retry(download, 10)(unit, patch).then(save);


  function save({ unit, patch, attachment }) {

    const attachmentFilename = normalizeFileName(attachment.filename); //TODO: check if needed in unrarSave as well 

    const patchFolder = path.join(folder, unit.unit, `${patch.id}`);
    const metaFileName = path.resolve(patchFolder, `${attachmentFilename}.json`);
    const meta = fs.outputJson(metaFileName, { unit, patch }, { spaces: 2 });

    let att; /*eslint init-declarations: "off"*/
    if (attachment.type === ".rar") {
      const extractor = unrar.createExtractorFromData(attachment.body);
      const list = extractor.extractAll();
      att = unrarSave(list, patchFolder);
    } else {
      const filename = path.resolve(patchFolder, attachmentFilename);
      att = fs.outputFile(filename, attachment.body)
    }
    return Promise.all([meta, att]);
  }

}

function normalizeFileName(filename) {
  // not expecting any dirname here;
  const ext = path.extname(filename);
  return path.basename(filename, ext).trim() + ext;
}

function parseAttachment(response) {
  const { headers /*, body */ } = response;
  const cd = parseContentDisposition(headers["content-disposition"]);
  const filename = cd.parameters.filename;
  const ext = path.extname(filename);
  return {
    filename: filename,
    type: ext,
    body: response.body
  }
}
module.exports = {
  units,
  patches,
  download,
  downloadAndSave
}