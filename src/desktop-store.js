import Q from 'q'
import logger from 'log-minim'

let log = logger("desktop-store");
log.setLevel("warn");


class DesktopStore {
  constructor(options){
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

  login() {}

  logout() {}


  /*-------------------file/folder manipulation methods---------------- */

  /**
  * list all elements inside the given uri (non recursive)
  * @param {String} uri the folder whose content we want to list
  * @return {Object} a promise, that gets resolved with the content of the uri
   */

  list(uri) {
    var deferred;
    deferred = Q.defer();
    return deferred;
  }

  /**
  * read the file at the given uri: optionally can be an html5 FILE , return its content
  * @param {String} uri absolute uri of the file whose content we want
  * @param {String} encoding the encoding used to read the file
  * @return {Object} a promise, that gets resolved with the content of file at the given uri
   */

  read(uri){
    let deferred = Q.defer();
    let reader = new FileReader();
    log.debug("reading from " + uri);

    function onLoad(event) {
      var result;
      if (event != null) {
        result = event.target.result;
        return deferred.resolve(result);
      } else {
        throw new Error("no event data");
      }
    };
    function onProgress(event) {
      var percentComplete;
      if (event.lengthComputable) {
        percentComplete = (event.loaded / event.total) * 100;
        log.debug("fetching percent", percentComplete);
        return deferred.notify({
          "fetching": percentComplete,
          "total": event.total
        });
      }
    };

    function onError(error) {
      log.error("error", event);
      return deferred.reject(error);
    };

    reader.onload = onLoad;
    //reader.onloadend = onLoad;
    reader.onprogress = onProgress;
    reader.onerror = onError;
    reader.readAsBinaryString(uri);
    return deferred;
  }

  /*-------------------Helpers---------------- */
}

module.exports =  DesktopStore
