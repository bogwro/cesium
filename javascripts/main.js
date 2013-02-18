require.config({
    baseUrl: "/cesium/javascripts",
    waitSeconds: 15,
    paths: {
        cesium: "Cesium"
    },
    shim: {
        cesium: {
            exports: 'Cesium'
        }
    }
});

require(['cesium', 'domReady!'], function(Cesium, document) {

    var canvas = document.getElementById('globe'),
        scene = new Cesium.Scene(canvas),
        skyBoxBaseUrl = '/cesium/images/SkyBox/tycho2t3_80',
        primitives, bing, ellipsoid, centralBody,
        animate = function() {},
        tick = function() {
            scene.initializeFrame();
            animate();
            scene.render();
            Cesium.requestAnimationFrame(tick);
        },
        onResize = function() {
            var width = canvas.clientWidth,
                height = canvas.clientHeight;
            if(canvas.width === width && canvas.height === height) {
                return;
            }
            canvas.width = width;
            canvas.height = height;
            scene.getCamera().frustum.aspectRatio = width / height;
        };

    scene.skyBox = new Cesium.SkyBox({
        positiveX: skyBoxBaseUrl + '_px.jpg',
        negativeX: skyBoxBaseUrl + '_mx.jpg',
        positiveY: skyBoxBaseUrl + '_py.jpg',
        negativeY: skyBoxBaseUrl + '_my.jpg',
        positiveZ: skyBoxBaseUrl + '_pz.jpg',
        negativeZ: skyBoxBaseUrl + '_mz.jpg'
    });
    primitives = scene.getPrimitives();
    bing = new Cesium.BingMapsImageryProvider({
        url: 'http://dev.virtualearth.net',
        mapStyle: Cesium.BingMapsStyle.AERIAL,
        proxy: Cesium.FeatureDetection.supportsCrossOriginImagery() ? undefined : new Cesium.DefaultProxy('/proxy/')
    });
    ellipsoid = Cesium.Ellipsoid.WGS84;
    centralBody = new Cesium.CentralBody(ellipsoid);
    centralBody.getImageryLayers().addImageryProvider(bing);
    primitives.setCentralBody(centralBody);

    new Cesium.SceneTransitioner(scene, ellipsoid);

    tick();

    canvas.oncontextmenu = function() {
        return false;
    }

    window.onresize = function() {
        onResize();
    }

    onResize();


});