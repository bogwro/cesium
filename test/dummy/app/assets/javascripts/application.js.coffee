require [
    'jquery'
    'Cesium'
], ($, Cesium) ->

    console.debug "Loaded Cesium v#{Cesium.VERSION}"

    canvas = null
    scene = null

    init = ->
        canvas = document.getElementById('globe')

        scene = new Cesium.Scene
            canvas: canvas
            contextOptions:
                webgl:
                    alpha: false
                    depth: true
                    stencil: false
                    antialias: true
                    premultipliedAlpha: true
                    preserveDrawingBuffer: true
                    failIfMajorPerformanceCaveat: true
                allowTextureFilterAnisotropic: true

        imagery = new Cesium.BingMapsImageryProvider url: '//dev.virtualearth.net'
        #terrain = new Cesium.CesiumTerrainProvider url: '//cesium.agi.com/smallterrain'

        ellipsoid = Cesium.Ellipsoid.WGS84

        globe = new Cesium.Globe(ellipsoid)
        globe.imageryLayers.addImageryProvider(imagery)
        #globe.terrainProvider = terrain

        scene.globe = globe
        scene.skyAtmosphere = new Cesium.SkyAtmosphere(ellipsoid)
        scene.sun = new Cesium.Sun()
        scene.moon = new Cesium.Moon()
        scene.skyBox = create_skybox()

        new Cesium.SceneTransitioner(scene, ellipsoid)


    create_skybox = ->
        new Cesium.SkyBox
            sources:
                positiveX: skybox_asset_url('px')
                negativeX: skybox_asset_url('mx')
                positiveY: skybox_asset_url('py')
                negativeY: skybox_asset_url('my')
                positiveZ: skybox_asset_url('pz')
                negativeZ: skybox_asset_url('mz')

    skybox_asset_url = (suffix) -> "/assets/Cesium-1.1/Assets/Textures/SkyBox/tycho2t3_80_#{suffix}.jpg"


    animate = ->
        scene.initializeFrame()

        # INSERT CODE HERE to update primitives based on changes to animation time, camera parameters, etc.

        scene.render()
        Cesium.requestAnimationFrame(animate)


    resize = ->
        width = canvas.clientWidth
        height = canvas.clientHeight
        unless canvas.width is width and canvas.height is height
            canvas.width = width
            canvas.height = height
            scene?.camera.frustum.aspectRatio = width / height


    $ ->
        init()

        ##################################################################
        #   INSERT CODE HERE to create graphics primitives in the scene.
        ##################################################################

        resize()
        window.addEventListener 'resize', resize
        animate()


