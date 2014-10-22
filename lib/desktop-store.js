require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"iyAFcw":[function(require,module,exports){
(function (process){
var DesktopStore, Minilog, Q, detectEnv, logger,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

detectEnv = require("composite-detect");

Q = require("q");

if (detectEnv.isModule) {
  Minilog = require("minilog");
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatClean).pipe(Minilog.backends.console);
  logger = Minilog('desktop-store');
}

if (detectEnv.isNode) {
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatColor).pipe(Minilog.backends.console);
}

if (detectEnv.isBrowser) {
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatClean).pipe(Minilog.backends.console);
  logger = Minilog('desktop-store');
}

DesktopStore = (function() {
  function DesktopStore(options) {
    this.read = __bind(this.read, this);
    this.list = __bind(this.list, this);
    this.logout = __bind(this.logout, this);
    this.login = __bind(this.login, this);
    var defaults;
    options = options || {};
    defaults = {
      enabled: (typeof process !== "undefined" && process !== null ? true : false),
      name: "Desktop",
      type: "",
      description: "",
      rootUri: typeof process !== "undefined" && process !== null ? process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE : null,
      isDataDumpAllowed: false,
      showPaths: true
    };
    this.timeout = 0;
  }

  DesktopStore.prototype.login = function() {};

  DesktopStore.prototype.logout = function() {};


  /*-------------------file/folder manipulation methods---------------- */


  /**
  * list all elements inside the given uri (non recursive)
  * @param {String} uri the folder whose content we want to list
  * @return {Object} a promise, that gets resolved with the content of the uri
   */

  DesktopStore.prototype.list = function(uri) {
    var deferred;
    deferred = Q.defer();
    return deferred;
  };


  /**
  * read the file at the given uri: optionally can be an html5 FILE , return its content
  * @param {String} uri absolute uri of the file whose content we want
  * @param {String} encoding the encoding used to read the file
  * @return {Object} a promise, that gets resolved with the content of file at the given uri
   */

  DesktopStore.prototype.read = function(uri) {
    var deferred, onError, onLoad, onProgress, reader;
    deferred = Q.defer();
    reader = new FileReader();
    logger.debug("reading from " + uri);
    onLoad = function(event) {
      var result;
      if (event != null) {
        result = event.target.result;
        return deferred.resolve(result);
      } else {
        throw new Error("no event data");
      }
    };
    onProgress = function(event) {
      var percentComplete;
      if (event.lengthComputable) {
        percentComplete = (event.loaded / event.total) * 100;
        logger.debug("fetching percent", percentComplete);
        return deferred.notify({
          "fetching": percentComplete,
          "total": event.total
        });
      }
    };
    onError = function(error) {
      logger.error("error", event);
      return deferred.reject(error);
    };
    reader.onload = onLoad;
    reader.onloadend = onLoad;
    reader.onprogress = onProgress;
    reader.onerror = onError;
    reader.readAsBinaryString(uri);
    return deferred;
  };


  /*-------------------Helpers---------------- */

  return DesktopStore;

})();

if (detectEnv.isModule) {
  module.exports = DesktopStore;
}


}).call(this,require("/home/mmoissette/dev/projects/coffeescad/stores/usco-desktop-store/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/mmoissette/dev/projects/coffeescad/stores/usco-desktop-store/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":1,"composite-detect":false,"minilog":false,"q":false}],"desktop-store":[function(require,module,exports){
module.exports=require('iyAFcw');
},{}]},{},["iyAFcw"])