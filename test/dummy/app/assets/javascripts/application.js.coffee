require [
  'jquery'
  'app'
  'Cesium'
], ($, App, Cesium) ->

  $ ->
    console.log "ALL OK"
    app = new App();
    console.log app
    console.log Cesium