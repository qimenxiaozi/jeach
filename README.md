# generator-foreach 

  use generator function to iterator array.

## simple example

```js
	yield forEach([1, 2, 3], function*(value) {
        let first = yield new Promise(function(resolve, reject) {
          resolve(value); 
        });

        let sec = yield new Promise(function(resolve, reject) {
          resolve(value); 
        });
        ....
    }
```

## License

  MIT
