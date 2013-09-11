/*global define*/
define(['Core/WallOutlineGeometry', 'Core/Ellipsoid', 'Scene/PrimitivePipeline', 'Workers/createTaskProcessorWorker'], function(
        WallOutlineGeometry,
        Ellipsoid,
        PrimitivePipeline,
        createTaskProcessorWorker) {
    "use strict";

    function createWallOutlineGeometry(parameters, transferableObjects) {
        var wallGeometry = parameters.geometry;
        wallGeometry._ellipsoid = Ellipsoid.clone(wallGeometry._ellipsoid);

        var geometry = WallOutlineGeometry.createGeometry(wallGeometry);
        PrimitivePipeline.transferGeometry(geometry, transferableObjects);

        return {
            geometry : geometry,
            index : parameters.index
        };
    }

    return createTaskProcessorWorker(createWallOutlineGeometry);
});
