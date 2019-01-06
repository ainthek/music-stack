// wrapper over web site https://guitarpatches.com/
// usable to implement downloads and online APIs over the patches

const request = require("request-promise-native");
const cheerio = require("cheerio");
const qs = require("querystring");
const Promise = require("bluebird");

const base = "https://guitarpatches.com"
const parseHtml = (str) => cheerio.load(str);
const sequence = function*(s, e) { for (let i = s; i <= e; i++) yield i; };
const concat = (arrays) => arrays.reduce((p, c) => p.concat(c), []);
// -------------------------------------------------------
const units = () => request.get(`${base}/units.php`)
  .then(parseHtml)
  .then(parseUnits)

const parseUnits = ($) => $("H2")
  .map((i, e) => ({
    name: $(e).text(),
    link: $(e).parent().attr("href"),
  })).get();
// -------------------------------------------------------
function patches(unit) {
  //https://guitarpatches.com/patches.php?unit=G2Nu
  return request.get(`${base}/${unit.link}`)
    .then(parseHtml)
    .then(listPatches)

  function listPatches($firstPage) {
    // paged display
    const pageCount = Number($firstPage(".paginate *:nth-last-child(2)").text());
    const urls = Array.from(
      sequence(1, pageCount),
      page => `${base}/${unit.link}&page=${page}`
    );
    return Promise.map(urls, getPage, { concurrency: 1 })
      .then(concat);

    function getPage(url) {
      return request.get(url)
        .then(parseHtml)
        .then(parsePatches)
    }
  }
}

function parsePatches($) {
  const parseTr = (i, tr) => {
    let link = $("TD:nth-child(1) a", tr).attr("href");
    let id = qs.parse(link).ID;
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


// -------------------------------------------------------
function _test() {
  const log = (s) => (console.error(s), s);

  log(`POST:${__filename}`);
  units().then(log);

  patches({
    name: 'G2Nu and G2.1Nu',
    link: 'patches.php?unit=G2Nu'
  }).then(log);

}
_test();