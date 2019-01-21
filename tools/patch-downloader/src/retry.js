//https://github.com/petkaantonov/bluebird/issues/1396
//TODO: tests
const debuglog = require('util').debuglog('retry');
const retry = (fn, retries = 3, backoff = () => 100) => async (...args) => {
  /*eslint consistent-return: "off"*/
  /*eslint no-await-in-loop: "off"*/
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fn(...args);
    } catch (e) {
      debuglog(`failed try: ${i} of function ${fn.name}`);
      if (i === retries - 1) {
        debuglog(`last try failed of function${fn.name}${JSON.stringify(args)}`);
        throw e;
      }
      await sleep(backoff(i, e));
      debuglog("backoff wakeup for");
    }
  }
};

function sleep(ms = 0) {
  debuglog(`backoff sleep for: ${ms} ms`);
  return new Promise(r => setTimeout(r, ms));
}
module.exports = retry;