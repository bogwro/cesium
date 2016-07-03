module Cesium
  class Engine < ::Rails::Engine

    initializer 'cesium.assets_path' do |app|

      cesium_sources = %w(
        Cesium/Workers/cesiumWorkerBootstrapper.js
        Cesium/Workers/combineGeometry.js
        Cesium/Workers/createBoxGeometry.js
        Cesium/Workers/createBoxOutlineGeometry.js
        Cesium/Workers/createCircleGeometry.js
        Cesium/Workers/createCircleOutlineGeometry.js
        Cesium/Workers/createCorridorGeometry.js
        Cesium/Workers/createCorridorOutlineGeometry.js
        Cesium/Workers/createCylinderGeometry.js
        Cesium/Workers/createCylinderOutlineGeometry.js
        Cesium/Workers/createEllipseGeometry.js
        Cesium/Workers/createEllipseOutlineGeometry.js
        Cesium/Workers/createEllipsoidGeometry.js
        Cesium/Workers/createEllipsoidOutlineGeometry.js
        Cesium/Workers/createGeometry.js
        Cesium/Workers/createPointGeometry.js
        Cesium/Workers/createPolygonGeometry.js
        Cesium/Workers/createPolygonOutlineGeometry.js
        Cesium/Workers/createPolylineGeometry.js
        Cesium/Workers/createPolylineVolumeGeometry.js
        Cesium/Workers/createPolylineVolumeOutlineGeometry.js
        Cesium/Workers/createRectangleGeometry.js
        Cesium/Workers/createRectangleOutlineGeometry.js
        Cesium/Workers/createSimplePolylineGeometry.js
        Cesium/Workers/createSphereGeometry.js
        Cesium/Workers/createSphereOutlineGeometry.js
        Cesium/Workers/createTaskProcessorWorker.js
        Cesium/Workers/createVerticesFromHeightmap.js
        Cesium/Workers/createVerticesFromQuantizedTerrainMesh.js
        Cesium/Workers/createWallGeometry.js
        Cesium/Workers/createWallOutlineGeometry.js
        Cesium/Workers/transferTypedArrayTest.js
        Cesium/Workers/upsampleQuantizedTerrainMesh.js
      )
      app.config.assets.precompile += cesium_sources
    end

  end
end
