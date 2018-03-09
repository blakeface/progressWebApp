// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// make some random gif call
var img = fetch('http://api.giphy.com/v1/gifs/random?api_key=AJ83QzrMHLZD0W5Mb29KrTZO0QpIGy6s&tag=potato').then(function (resp) {
  return resp.json();
}).then(function (json) {
  return json;
}).catch(function (err) {
  return console.error('🚨 getting gif:', err);
});

exports.default = img;
},{}],7:[function(require,module,exports) {
'use strict';

var _fetchImage = require('./fetchImage.js');

var _fetchImage2 = _interopRequireDefault(_fetchImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register service worker (serviceWorker isn't available everywhere... 🍎)
if ('serviceWorker' in navigator && false) {
	navigator.serviceWorker.register('/dist/c8379bb24e9614352802c7892a870fe2.js').then(function () {
		return console.log('in index.js: service worker installed');
	}).catch(function (err) {
		return console.error('🚨 in index.js:', err);
	});
}
},{"./fetchImage.js":10,"./serviceWorker.js":[["c8379bb24e9614352802c7892a870fe2.js",12],12]}]},{},[7])