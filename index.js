exports.forEach = function* (arr, callback){
   if (!Array.isArray(arr)) {
      throw new Error('for now forEach only accept array as first parameter');
   }
   yield * arr.map(value => callback(value));
}
