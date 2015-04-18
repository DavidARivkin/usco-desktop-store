detectEnv = require "composite-detect"
Q = require "q"


if detectEnv.isModule
  Minilog=require("minilog")
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatClean).pipe(Minilog.backends.console)
  logger = Minilog('desktop-store')

if detectEnv.isNode
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatColor).pipe(Minilog.backends.console)

if detectEnv.isBrowser
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatClean).pipe(Minilog.backends.console)
  logger = Minilog('desktop-store')


class DesktopStore
  constructor:(options)->
    options = options or {}
    defaults =
      enabled: (if process? then true else false)
      name:"Desktop"
      type:"",
      description: ""
      rootUri:if process? then process.env.HOME or process.env.HOMEPATH or process.env.USERPROFILE else null
      isDataDumpAllowed: false
      showPaths:true
    @timeout = 0
    #options = merge defaults, options
    #super options
  
  login:=>
  logout:=>

  ###-------------------file/folder manipulation methods----------------###
  
  ###*
  * list all elements inside the given uri (non recursive)
  * @param {String} uri the folder whose content we want to list
  * @return {Object} a promise, that gets resolved with the content of the uri
  ###
  list:( uri )=>
    deferred = Q.defer()
    return deferred
  
  ###*
  * read the file at the given uri: optionally can be an html5 FILE , return its content
  * @param {String} uri absolute uri of the file whose content we want
  * @param {String} encoding the encoding used to read the file
  * @return {Object} a promise, that gets resolved with the content of file at the given uri
  ###
  read:( uri )=>
    deferred = Q.defer()
    
    reader = new FileReader()
    logger.debug "reading from #{uri}"
    
    onLoad= ( event )->
      if event?
        result = event.target.result
        deferred.resolve( result )
      else 
        throw new Error("no event data")
    
    onProgress= ( event )->
      if (event.lengthComputable)
        percentComplete = (event.loaded/event.total)*100
        logger.debug "fetching percent", percentComplete
        deferred.notify( {"fetching":percentComplete, "total":event.total} )
    
    onError= ( error )->
      logger.error "error",event
      deferred.reject error
    
    reader.onload     = onLoad
    reader.onloadend     = onLoad
    reader.onprogress = onProgress
    reader.onerror    = onError
    
    reader.readAsBinaryString( uri )
    return deferred

  ###-------------------Helpers----------------###

if detectEnv.isModule
  module.exports = DesktopStore
