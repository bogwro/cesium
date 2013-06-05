/*global define*/
define(['./DataSourceCollection',
        './DynamicBillboardVisualizer',
        './DynamicEllipsoidVisualizer',
        './DynamicConeVisualizerUsingCustomSensor',
        './DynamicLabelVisualizer',
        './DynamicPathVisualizer',
        './DynamicPointVisualizer',
        './DynamicPolygonVisualizer',
        './DynamicPolylineVisualizer',
        './DynamicPyramidVisualizer',
        './VisualizerCollection',
        '../Core/defaultValue',
        '../Core/destroyObject',
        '../Core/DeveloperError'
    ], function(
        DataSourceCollection,
        DynamicBillboardVisualizer,
        DynamicEllipsoidVisualizer,
        DynamicConeVisualizerUsingCustomSensor,
        DynamicLabelVisualizer,
        DynamicPathVisualizer,
        DynamicPointVisualizer,
        DynamicPolygonVisualizer,
        DynamicPolylineVisualizer,
        DynamicPyramidVisualizer,
        VisualizerCollection,
        defaultValue,
        destroyObject,
        DeveloperError) {
    "use strict";

    var defaultVisualizerTypes = [DynamicBillboardVisualizer,
                                  DynamicEllipsoidVisualizer,
                                  DynamicConeVisualizerUsingCustomSensor,
                                  DynamicLabelVisualizer,
                                  DynamicPointVisualizer,
                                  DynamicPolygonVisualizer,
                                  DynamicPolylineVisualizer,
                                  DynamicPyramidVisualizer,
                                  DynamicPathVisualizer];

    /**
     * Visualizes a collection of {@link DataSource} instances.
     * @alias DataSourceDisplay
     * @constructor
     *
     * @param {Scene} scene The scene in which to display the data.
     * @param {Array} [visualizerTypes] The array of visualizer constructor functions that will be created for each data source.  If undefined, All standard visualizers will be used.
     *
     * @exception {DeveloperError} scene is required.
     */
    var DataSourceDisplay = function(scene, visualizerTypes) {
        if (typeof scene === 'undefined') {
            throw new DeveloperError('scene is required.');
        }

        var dataSourceCollection = new DataSourceCollection();
        dataSourceCollection.dataSourceAdded.addEventListener(this._onDataSourceAdded, this);
        dataSourceCollection.dataSourceRemoved.addEventListener(this._onDataSourceRemoved, this);
        this._dataSourceCollection = dataSourceCollection;
        this._scene = scene;
        this._timeVaryingSources = [];
        this._staticSourcesToUpdate = [];
        this._visualizersTypes = defaultValue(visualizerTypes, defaultVisualizerTypes).slice(0);
    };

    /**
     * Gets the scene being used for display.
     * @returns {Scene} The scene.
     */
    DataSourceDisplay.prototype.getScene = function() {
        return this._scene;
    };

    /**
     * Gets the types of visualizers being used for display.
     * @returns {Array} A copy of the visualizer types being used for display.
     */
    DataSourceDisplay.prototype.getVisualizerTypes = function() {
        return this._visualizersTypes.slice(0);
    };

    /**
     * Gets the collection of data sources to be displayed.
     * @returns {DataSourceCollection} The collection of data sources.
     */
    DataSourceDisplay.prototype.getDataSources = function() {
        return this._dataSourceCollection;
    };

    /**
     * Returns true if this object was destroyed; otherwise, false.
     * <br /><br />
     * If this object was destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
     *
     * @return {Boolean} True if this object was destroyed; otherwise, false.
     *
     * @see DataSourceDisplay#destroy
     */
    DataSourceDisplay.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
     * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
     * <br /><br />
     * Once an object is destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
     * assign the return value (<code>undefined</code>) to the object as done in the example.
     *
     * @return {undefined}
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     * @see DataSourceDisplay#isDestroyed
     *
     * @example
     * dataSourceDisplay = dataSourceDisplay.destroy();
     */
    DataSourceDisplay.prototype.destroy = function() {
        var dataSources = this._dataSourceCollection;
        dataSources.dataSourceAdded.removeEventListener(this._onDataSourceAdded, this);
        dataSources.dataSourceRemoved.removeEventListener(this._onDataSourceRemoved, this);

        var length = dataSources.getLength();
        for ( var i = 0; i < length; i++) {
            var dataSource = dataSources.get(i);
            this._onDataSourceRemoved(this._dataSourceCollection, dataSource);
            if (typeof dataSource.destroy === 'function') {
                dataSource.destroy();
            }
        }
        return destroyObject(this);
    };

    /**
     * Updates time-varying data sources to the provided time and also
     * updates static data sources that have changed since the last
     * call to update.
     *
     * @param {JulianDate} time The simulation time.
     *
     * @exception {DeveloperError} time is required.
     */
    DataSourceDisplay.prototype.update = function(time) {
        if (typeof time === 'undefined') {
            throw new DeveloperError('time is required.');
        }

        var timeVaryingSources = this._timeVaryingSources;
        var staticSourcesToUpdate = this._staticSourcesToUpdate;
        var length;
        var i;

        length = timeVaryingSources.length;
        for (i = 0; i < length; i++) {
            timeVaryingSources[i]._visualizerCollection.update(time);
        }

        length = staticSourcesToUpdate.length;
        if (length > 0) {
            for (i = 0; i < length; i++) {
                staticSourcesToUpdate[i]._visualizerCollection.update(time);
            }
            this._staticSourcesToUpdate = [];
        }
    };

    DataSourceDisplay.prototype._onDataSourceAdded = function(dataSourceCollection, dataSource) {
        var visualizerTypes = this._visualizersTypes;
        var length = visualizerTypes.length;
        var visualizers = new Array(length);
        var scene = this._scene;
        for ( var i = 0; i < length; i++) {
            visualizers[i] = new visualizerTypes[i](scene);
        }

        var vCollection = new VisualizerCollection(visualizers, dataSource.getDynamicObjectCollection());
        dataSource._visualizerCollection = vCollection;
        dataSource.getChangedEvent().addEventListener(this._onDataSourceChanged, this);
        this._onDataSourceChanged(dataSource);
    };

    DataSourceDisplay.prototype._onDataSourceRemoved = function(dataSourceCollection, dataSource) {
        dataSource.getChangedEvent().removeEventListener(this._onDataSourceChanged, this);

        var timeVaryingIndex = this._timeVaryingSources.indexOf(dataSource);
        if (timeVaryingIndex !== -1) {
            this._timeVaryingSources.splice(timeVaryingIndex, 1);
        }

        var staticIndex = this._staticSourcesToUpdate.indexOf(dataSource);
        if (staticIndex !== -1) {
            this._staticSourcesToUpdate.splice(staticIndex, 1);
        }

        dataSource._visualizerCollection.destroy();
        dataSource._visualizerCollection = undefined;
    };

    DataSourceDisplay.prototype._onDataSourceChanged = function(dataSource) {
        var timeVaryingIndex = this._timeVaryingSources.indexOf(dataSource);
        var staticIndex = this._staticSourcesToUpdate.indexOf(dataSource);
        if (dataSource.getIsTimeVarying()) {
            if (timeVaryingIndex === -1) {
                this._timeVaryingSources.push(dataSource);
            }
            if (staticIndex !== -1) {
                this._staticSourcesToUpdate.splice(staticIndex, 1);
            }
        } else {
            if (staticIndex === -1) {
                this._staticSourcesToUpdate.push(dataSource);
            }
            if (timeVaryingIndex !== -1) {
                this._timeVaryingSources.splice(staticIndex, 1);
            }
        }
    };

    return DataSourceDisplay;
});