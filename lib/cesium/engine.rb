module Cesium
  class Engine < ::Rails::Engine

    initializer 'cesium.assets_path' do |app|

      workers = [
        "Cesium-1.2/Workers/Workers.profile.js",
        "Cesium-1.2/Workers/cesiumWorkerBootstrapper.js",
        "Cesium-1.2/Workers/combineGeometry.js",
        "Cesium-1.2/Workers/createBoxGeometry.js",
        "Cesium-1.2/Workers/createBoxOutlineGeometry.js",
        "Cesium-1.2/Workers/createCircleGeometry.js",
        "Cesium-1.2/Workers/createCircleOutlineGeometry.js",
        "Cesium-1.2/Workers/createCorridorGeometry.js",
        "Cesium-1.2/Workers/createCorridorOutlineGeometry.js",
        "Cesium-1.2/Workers/createCylinderGeometry.js",
        "Cesium-1.2/Workers/createCylinderOutlineGeometry.js",
        "Cesium-1.2/Workers/createEllipseGeometry.js",
        "Cesium-1.2/Workers/createEllipseOutlineGeometry.js",
        "Cesium-1.2/Workers/createEllipsoidGeometry.js",
        "Cesium-1.2/Workers/createEllipsoidOutlineGeometry.js",
        "Cesium-1.2/Workers/createGeometry.js",
        "Cesium-1.2/Workers/createPolygonGeometry.js",
        "Cesium-1.2/Workers/createPolygonOutlineGeometry.js",
        "Cesium-1.2/Workers/createPolylineGeometry.js",
        "Cesium-1.2/Workers/createPolylineVolumeGeometry.js",
        "Cesium-1.2/Workers/createPolylineVolumeOutlineGeometry.js",
        "Cesium-1.2/Workers/createRectangleGeometry.js",
        "Cesium-1.2/Workers/createRectangleOutlineGeometry.js",
        "Cesium-1.2/Workers/createSimplePolylineGeometry.js",
        "Cesium-1.2/Workers/createSphereGeometry.js",
        "Cesium-1.2/Workers/createSphereOutlineGeometry.js",
        "Cesium-1.2/Workers/createTaskProcessorWorker.js",
        "Cesium-1.2/Workers/createVerticesFromHeightmap.js",
        "Cesium-1.2/Workers/createVerticesFromQuantizedTerrainMesh.js",
        "Cesium-1.2/Workers/createWallGeometry.js",
        "Cesium-1.2/Workers/createWallOutlineGeometry.js",
        "Cesium-1.2/Workers/sanitizeHtml.js",
        "Cesium-1.2/Workers/transferTypedArrayTest.js",
        "Cesium-1.2/Workers/upsampleQuantizedTerrainMesh.js"
      ]
      app.config.assets.precompile += workers
    end

  end
end
