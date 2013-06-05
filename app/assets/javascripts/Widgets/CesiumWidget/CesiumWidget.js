/*global define*/
define([
        '../../Core/buildModuleUrl',
        '../../Core/Cartesian2',
        '../../Core/Cartesian3',
        '../../Core/Clock',
        '../../Core/DefaultProxy',
        '../../Core/defaultValue',
        '../../Core/defineProperties',
        '../../Core/destroyObject',
        '../../Core/DeveloperError',
        '../../Core/Ellipsoid',
        '../../Core/FeatureDetection',
        '../../Core/requestAnimationFrame',
        '../../Scene/BingMapsImageryProvider',
        '../../Scene/CentralBody',
        '../../Scene/Scene',
        '../../Scene/SceneTransitioner',
        '../../Scene/SkyAtmosphere',
        '../../Scene/SkyBox',
        '../../Scene/Sun'
    ], function(
        buildModuleUrl,
        Cartesian2,
        Cartesian3,
        Clock,
        DefaultProxy,
        defaultValue,
        defineProperties,
        destroyObject,
        DeveloperError,
        Ellipsoid,
        FeatureDetection,
        requestAnimationFrame,
        BingMapsImageryProvider,
        CentralBody,
        Scene,
        SceneTransitioner,
        SkyAtmosphere,
        SkyBox,
        Sun) {
    "use strict";

    function getDefaultSkyBoxUrl(suffix) {
        return buildModuleUrl('Assets/Textures/SkyBox/tycho2t3_80_' + suffix + '.jpg');
    }

    /**
     * A widget containing a Cesium scene.
     *
     * @alias CesiumWidget
     * @constructor
     *
     * @param {Element|String} container The DOM element or ID that will contain the widget.
     * @param {Object} [options] Configuration options for the widget.
     * @param {Clock} [options.clock=new Clock()] The clock to use to control current time.
     * @param {ImageryProvider} [options.imageryProvider=new BingMapsImageryProvider()] The imagery provider to serve as the base layer.
     * @param {TerrainProvider} [options.terrainProvider=new EllipsoidTerrainProvider] The terrain provider.
     *
     * @exception {DeveloperError} container is required.
     * @exception {DeveloperError} Element with id "container" does not exist in the document.
     *
     * @example
     * // For each example, include a link to CesiumWidget.css stylesheet in HTML head,
     * // and in the body, include: &lt;div id="cesiumContainer"&gt;&lt;/div&gt;
     *
     * //Widget with no terrain and default Bing Maps imagery provider.
     * var widget = new Cesium.CesiumWidget('cesiumContainer');
     *
     * //Widget with OpenStreetMaps imagery provider and Cesium terrain provider hosted by AGI.
     * var widget = new Cesium.CesiumWidget('cesiumContainer', {
     *     imageryProvider : new Cesium.OpenStreetMapImageryProvider(),
     *     terrainProvider : new Cesium.CesiumTerrainProvider({
     *         url : 'http://cesium.agi.com/smallterrain',
     *         credit : 'Terrain data courtesy Analytical Graphics, Inc.'
     *     })
     * });
     */
    var CesiumWidget = function(container, options) {
        if (typeof container === 'undefined') {
            throw new DeveloperError('container is required.');
        }

        if (typeof container === 'string') {
            var tmp = document.getElementById(container);
            if (tmp === null) {
                throw new DeveloperError('Element with id "' + container + '" does not exist in the document.');
            }
            container = tmp;
        }

        options = defaultValue(options, {});

        //Configure the widget DOM elements
        var widgetNode = document.createElement('div');
        widgetNode.className = 'cesium-widget';
        container.appendChild(widgetNode);

        var canvas = document.createElement('canvas');
        canvas.oncontextmenu = function() {
            return false;
        };
        canvas.onselectstart = function() {
            return false;
        };
        widgetNode.appendChild(canvas);

        var cesiumLogo = document.createElement('a');
        cesiumLogo.href = 'http://cesium.agi.com/';
        cesiumLogo.target = '_blank';
        cesiumLogo.className = 'cesium-widget-logo';
        widgetNode.appendChild(cesiumLogo);

        var scene = new Scene(canvas);
        scene.getCamera().controller.constrainedAxis = Cartesian3.UNIT_Z;

        var _ellipsoid = Ellipsoid.WGS84;

        var centralBody = new CentralBody(_ellipsoid);
        centralBody.logoOffset = new Cartesian2(125, 0);
        scene.getPrimitives().setCentralBody(centralBody);

        scene.skyBox = new SkyBox({
            positiveX : getDefaultSkyBoxUrl('px'),
            negativeX : getDefaultSkyBoxUrl('mx'),
            positiveY : getDefaultSkyBoxUrl('py'),
            negativeY : getDefaultSkyBoxUrl('my'),
            positiveZ : getDefaultSkyBoxUrl('pz'),
            negativeZ : getDefaultSkyBoxUrl('mz')
        });
        scene.skyAtmosphere = new SkyAtmosphere(_ellipsoid);
        scene.sun = new Sun();

        //Set the base imagery layer
        var imageryProvider = options.imageryProvider;
        if (typeof imageryProvider === 'undefined') {
            imageryProvider = new BingMapsImageryProvider({
                url : 'http://dev.virtualearth.net',
                // Some versions of Safari support WebGL, but don't correctly implement
                // cross-origin image loading, so we need to load Bing imagery using a proxy.
                proxy : FeatureDetection.supportsCrossOriginImagery() ? undefined : new DefaultProxy('http://cesium.agi.com/proxy/')
            });
        }
        centralBody.getImageryLayers().addImageryProvider(imageryProvider);

        //Set the terrain provider if one is provided.
        if (typeof options.terrainProvider !== 'undefined') {
            centralBody.terrainProvider = options.terrainProvider;
        }

        this._element = widgetNode;
        this._container = container;
        this._canvas = canvas;
        this._cesiumLogo = cesiumLogo;
        this._scene = scene;
        this._centralBody = centralBody;
        this._clock = defaultValue(options.clock, new Clock());
        this._transitioner = new SceneTransitioner(scene, _ellipsoid);

        var widget = this;
        //Subscribe for resize events and set the initial size.
        this._needResize = true;
        this._resizeCallback = function() {
            widget._needResize = true;
        };
        window.addEventListener('resize', this._resizeCallback, false);

        //Create and start the render loop
        this._isDestroyed = false;
        function render() {
            if (!widget._isDestroyed) {
                widget.render();
                requestAnimationFrame(render);
            }
        }
        requestAnimationFrame(render);
    };

    defineProperties(CesiumWidget.prototype, {
        /**
         * Gets the parent container.
         * @memberof CesiumWidget.prototype
         *
         * @type {Element}
         */
        container : {
            get : function() {
                return this._container;
            }
        },

        /**
         * Gets the scene transitioner.
         * @memberof CesiumWidget.prototype
         *
         * @type {SceneTransitioner}
         */
        sceneTransitioner : {
            get : function() {
                return this._transitioner;
            }
        },

        /**
         * Gets the canvas.
         * @memberof CesiumWidget.prototype
         *
         * @type {Canvas}
         */
        canvas : {
            get : function() {
                return this._canvas;
            }
        },

        /**
         * Gets the Cesium logo element.
         * @memberof CesiumWidget.prototype
         *
         * @type {Element}
         */
        cesiumLogo : {
            get : function() {
                return this._cesiumLogo;
            }
        },

        /**
         * Gets the scene.
         * @memberof CesiumWidget.prototype
         *
         * @type {Scene}
         */
        scene : {
            get : function() {
                return this._scene;
            }
        },

        /**
         * Gets the primary central body.
         * @memberof CesiumWidget.prototype
         *
         * @type {CentralBody}
         */
        centralBody : {
            get : function() {
                return this._centralBody;
            }
        },

        /**
         * Gets the clock.
         * @memberof CesiumWidget.prototype
         *
         * @type {Clock}
         */
        clock : {
            get : function() {
                return this._clock;
            }
        }
    });

    /**
     * @memberof CesiumWidget
     *
     * @returns {Boolean} true if the object has been destroyed, false otherwise.
     */
    CesiumWidget.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * Destroys the widget.  Should be called if permanently
     * removing the widget from layout.
     * @memberof CesiumWidget
     */
    CesiumWidget.prototype.destroy = function() {
        window.removeEventListener('resize', this._resizeCallback, false);
        this._container.removeChild(this._element);
        this._isDestroyed = true;
        destroyObject(this);
    };

    /**
     * Call this function when the widget changes size, to update the canvas
     * size, camera aspect ratio, and viewport size. This function is called
     * automatically on window resize.
     * @memberof CesiumWidget
     */
    CesiumWidget.prototype.resize = function() {
        var width = this._canvas.clientWidth;
        var height = this._canvas.clientHeight;

        if (this._canvas.width === width && this._canvas.height === height) {
            return;
        }

        this._canvas.width = width;
        this._canvas.height = height;

        var frustum = this._scene.getCamera().frustum;
        if (typeof frustum.aspectRatio !== 'undefined') {
            frustum.aspectRatio = width / height;
        } else {
            frustum.top = frustum.right * (height / width);
            frustum.bottom = -frustum.top;
        }
    };

    /**
     * Forces an update and render of the scene. This function is called
     * automatically.
     * @memberof CesiumWidget
     */
    CesiumWidget.prototype.render = function() {
        if (this._needResize) {
            this.resize();
            this._needResize = false;
        }

        var currentTime = this._clock.tick();
        this._scene.initializeFrame();
        this._scene.render(currentTime);
    };

    return CesiumWidget;
});
