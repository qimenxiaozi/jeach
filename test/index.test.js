'use strict';
const helper = require('../index');
const expect = require('chai').expect;
const thunkify = require('thunkify-wrap');
const fs = require('fs');
const co = require('co');

describe('test', function() {
  describe('index.test.js', function() { 
    it('should work by sequence', function(done) {
      let items = []; 
      co(helper.forEach([1, 2, 3], function*(value) {
        let pass = yield new Promise(function(resolve, reject) {
          resolve(value); 
        });

        items.push(pass);

      })).then(() => {
        expect(items).to.eql([1,2,3]);
        done();
      }).catch( (err) => {throw err;});
    })

    it('should work mult-yield expressions', function(done) {
      co(helper.forEach([1, 2, 3], function*(value) {
        let first = yield new Promise(function(resolve, reject) {
          resolve(value); 
        });

        let sec = yield new Promise(function(resolve, reject) {
          resolve(value); 
        });
        expect(first + sec).to.eql(value * 2);

      })).then(() => done()).catch( (err) => {throw err;});
    })

    it('should work for node native module', function(done) {
      let readFile = thunkify(fs.readFile);
      co(helper.forEach(['index.test.js'], function*(value) {
        let content = yield readFile(`${__dirname}/${value}`);
        expect(content.toString()).to.contain(value);
      })).then( () => done())
      .catch( (err) => {throw err;});
    })
  });
});
