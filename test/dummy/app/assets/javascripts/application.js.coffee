require [
  'jquery'
  'app'
  'Cesium'
], ($, App, Cesium) ->

  $ ->

    app = new App();

    canvas = $('#globe')[0]
    @scene = new Cesium.Scene canvas

    console.log
      scene: @scene
      app: app

    @scene.skyAtmosphere = new Cesium.SkyAtmosphere

    skyBoxBaseUrl = '/assets/Assets/Textures/SkyBox/tycho2t3_80'
    @scene.skyBox = new Cesium.SkyBox
      positiveX: skyBoxBaseUrl + '_px.jpg'
      negativeX: skyBoxBaseUrl + '_mx.jpg'
      positiveY: skyBoxBaseUrl + '_py.jpg'
      negativeY: skyBoxBaseUrl + '_my.jpg'
      positiveZ: skyBoxBaseUrl + '_pz.jpg'
      negativeZ: skyBoxBaseUrl + '_mz.jpg'


    primitives = @scene.getPrimitives()

    bing = new Cesium.BingMapsImageryProvider(
      url: 'http://dev.virtualearth.net'
      mapStyle: Cesium.BingMapsStyle.AERIAL
      proxy: if Cesium.FeatureDetection.supportsCrossOriginImagery() then undefined else new Cesium.DefaultProxy('/proxy/')
    )

    ellipsoid = Cesium.Ellipsoid.WGS84
    centralBody = new Cesium.CentralBody(ellipsoid)
    centralBody.getImageryLayers().addImageryProvider(bing)
    primitives.setCentralBody(centralBody)

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
      canvas.width = width;
      canvas.height = height;
      @scene.getCamera().frustum.aspectRatio = width / height;


    $(window).on('resize', onResize)
    onResize()