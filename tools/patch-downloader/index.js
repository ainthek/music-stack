// just playing with async await mainly
// could be much nicer if written with async.js and promises

// if this is A it has next page
// if this is span it is the last page 
// cheerio ".paginate *:last-child"

const request = require("request-promise-native")
  .defaults({ pool: { maxSockets: 1 } });
const cheerio = require("cheerio");
const querystring = require("querystring");
const fs = require("fs-extra");
const path = require("path");

const base = "https://guitarpatches.com/patches.php?unit=G2Nu";
const download = "https://guitarpatches.com/download.php?unit=G2Nu&mode=download";

const log = (s) => (console.log(s), s);
const parse = (html) => cheerio.load(html);
const nextBtn = ($) => $(".paginate *:last-child")[0]
const hasNext = ($) => nextBtn($).name === 'a'; //TODO: #.is()
const downloadPatch = (patch) => request.get(`${download}&ID=${patch.id}`);

const parseRows = ($) => {
  const parseTr = (i, tr) => {
    let link = $("TD:nth-child(1) a", tr).attr("href");
    let id = querystring.parse(link).ID;
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
  return $("table.lists").first()
    .find("tbody>tr").map(parseTr).get()
}

async function* pages() {
  let page = 1;
  let last;
  do {
    let html = await request.get(`${base}&page=${page}`);
    let $ = parse(html);
    let rows = parseRows($);
    last = !hasNext($);
    page++;
    yield rows;
  } while (!last);
}
async function main() {

  let data = [];
  for await (let page of pages()) {
    data.push(...page);
  }
  let downloads = data.map(async (patch) => {
    try {
      patch.bin = await downloadPatch(patch);
    } catch (ex) {
      console.error("cannot download patch ", patch);
    }
  });
  await Promise.all(downloads)
  // await Promise.all(data.map({bin})=>({bin}));
  // data.forEach
  let outPath = path.resolve(__dirname, "out", "G2Nu.json");
  await fs.outputJSON(outPath, data);
  console.log("done");

}

main();