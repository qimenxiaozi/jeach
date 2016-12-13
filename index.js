const co = require("co");

exports.forEach = function* (arr, callback){
  if (!Array.isArray(arr)) {
    throw new Error('helper.forEach only accept array as first parameter');
  }
  if (arr.length === 0) {
    return;
  }

  let cb = co.wrap(callback);
  yield arr.reduce((pre, cur, index) => {
    if (index === 0) {
      return cb(cur);
    }

    return new Promise((resolve, reject) => {
      pre.then(() => resolve(cb(cur)))
      .catch(err => reject(err));
    });
  }, true);
}
