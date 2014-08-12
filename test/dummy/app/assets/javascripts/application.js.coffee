require [
  'jquery'
  'Cesium'
], ($, Cesium) ->

  $ ->

    window.cesium = Cesium

    canvas = $('#globe')[0]

    sceneParams =
      webgl:
        alpha: false
        depth: true
        stencil: false
        antialias: true
        premultipliedAlpha: true
        preserveDrawingBuffer: true
        failIfMajorPerformanceCaveat: true
      allowTextureFilterAnisotropic: true

    @scene = new Cesium.Scene
      canvas: canvas
      contextOptions: sceneParams

    primitives = @scene.primitives

    bing = new Cesium.BingMapsImageryProvider(
      url: 'http://dev.virtualearth.net'
      mapStyle: Cesium.BingMapsStyle.AERIAL
    )

    terrainProvider = new Cesium.CesiumTerrainProvider(
      url: 'http://cesium.agi.com/smallterrain'
    )

    ellipsoid = Cesium.Ellipsoid.WGS84
    centralBody = new Cesium.Globe(ellipsoid)
    centralBody.imageryLayers.addImageryProvider(bing)
    centralBody.terrainProvider = terrainProvider
    primitives.centralBody = centralBody

    #    transitioner = new Cesium.SceneTransitioner(@scene, ellipsoid)
    new Cesium.SceneTransitioner(@scene, ellipsoid)

    ##################################################################
    #   INSERT CODE HERE to create graphics primitives in the scene.
    ##################################################################

    animate = =>
      # INSERT CODE HERE to update primitives based on changes to animation time, camera parameters, etc.

    tick = =>
      @scene.initializeFrame()
      animate()
      @scene.render()
      Cesium.requestAnimationFrame(tick)

    tick()

    canvas.oncontextmenu = =>
      false

    onResize = =>
      width = canvas.clientWidth
      height = canvas.clientHeight
      return if canvas.width == width and canvas.height == height
      canvas.width = width
      canvas.height = height
      @scene.camera.frustum.aspectRatio = width / height


    $(window).on('resize', onResize)
    onResize()