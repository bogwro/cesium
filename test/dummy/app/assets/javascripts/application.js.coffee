require ['jquery', 'Cesium'], ($) ->

    getDefaultSkyBoxUrl = (suffix) -> "/assets/Assets/Textures/SkyBox/tycho2t3_80_#{suffix}.jpg"

    $ ->

        canvas = $('#globe')[0]

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

        bing = new Cesium.BingMapsImageryProvider
            url: 'http://dev.virtualearth.net'
            mapStyle: Cesium.BingMapsStyle.AERIAL

        terrainProvider = new Cesium.CesiumTerrainProvider
            url: 'http://cesium.agi.com/smallterrain'

        ellipsoid = Cesium.Ellipsoid.WGS84
        globe = new Cesium.Globe(ellipsoid)
        globe.imageryLayers.addImageryProvider(bing)
        globe.terrainProvider = terrainProvider
        scene.globe = globe

        skyBox = new Cesium.SkyBox
            sources:
                positiveX: getDefaultSkyBoxUrl('px')
                negativeX: getDefaultSkyBoxUrl('mx')
                positiveY: getDefaultSkyBoxUrl('py')
                negativeY: getDefaultSkyBoxUrl('my')
                positiveZ: getDefaultSkyBoxUrl('pz')
                negativeZ: getDefaultSkyBoxUrl('mz')

        scene.skyBox = skyBox
        scene.skyAtmosphere = new Cesium.SkyAtmosphere(ellipsoid)
        scene.sun = new Cesium.Sun()
        scene.moon = new Cesium.Moon()

        new Cesium.SceneTransitioner(scene, ellipsoid)

        ##################################################################
        #   INSERT CODE HERE to create graphics primitives in the scene.
        ##################################################################

        animate = =>
            # INSERT CODE HERE to update primitives based on changes to animation time, camera parameters, etc.

        tick = =>
            scene.initializeFrame()
            animate()
            scene.render()
            Cesium.requestAnimationFrame(tick)

        tick()

        canvas.oncontextmenu = => false

        onResize = =>
            width = canvas.clientWidth
            height = canvas.clientHeight
            return if canvas.width == width and canvas.height == height
            canvas.width = width
            canvas.height = height
            scene.camera.frustum.aspectRatio = width / height

        $(window).on('resize', onResize)
        onResize()

