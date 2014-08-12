module Cesium
  class Engine < ::Rails::Engine

    initializer 'cesium.assets_path' do |app|
      app.config.assets.precompile += %w(Workers/cesiumWorkerBootstrapper.js Workers/combineGeometry.js Workers/createBoxGeometry.js Workers/createBoxOutlineGeometry.js Workers/createCircleGeometry.js Workers/createCircleOutlineGeometry.js Workers/createCorridorGeometry.js Workers/createCorridorOutlineGeometry.js Workers/createCylinderGeometry.js Workers/createCylinderOutlineGeometry.js Workers/createEllipseGeometry.js Workers/createEllipseOutlineGeometry.js Workers/createEllipsoidGeometry.js Workers/createEllipsoidOutlineGeometry.js Workers/createGeometry.js Workers/createPolygonGeometry.js Workers/createPolygonOutlineGeometry.js Workers/createPolylineGeometry.js Workers/createPolylineVolumeGeometry.js Workers/createPolylineVolumeOutlineGeometry.js Workers/createRectangleGeometry.js Workers/createRectangleOutlineGeometry.js Workers/createSimplePolylineGeometry.js Workers/createSphereGeometry.js Workers/createSphereOutlineGeometry.js Workers/createTaskProcessorWorker.js Workers/createVerticesFromHeightmap.js Workers/createVerticesFromQuantizedTerrainMesh.js Workers/createWallGeometry.js Workers/createWallOutlineGeometry.js Workers/sanitizeHtml.js Workers/transferTypedArrayTest.js Workers/upsampleQuantizedTerrainMesh.js)
    end

  end
end
