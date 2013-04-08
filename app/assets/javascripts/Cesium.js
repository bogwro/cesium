/*global define*/
define('Cesium',['Core/AxisAlignedBoundingBox', 'Core/BoundingRectangle', 'Core/BoundingSphere', 'Core/BoxTessellator', 'Core/Cartesian2', 'Core/Cartesian3', 'Core/Cartesian4', 'Core/Cartographic', 'Core/CatmullRomSpline', 'Core/Clock', 'Core/ClockRange', 'Core/ClockStep', 'Core/Color', 'Core/ComponentDatatype', 'Core/CubeMapEllipsoidTessellator', 'Core/CubicRealPolynomial', 'Core/DefaultProxy', 'Core/DeveloperError', 'Core/EarthOrientationParameters', 'Core/EarthOrientationParametersSample', 'Core/Ellipsoid', 'Core/EllipsoidTangentPlane', 'Core/EllipsoidalOccluder', 'Core/EncodedCartesian3', 'Core/Enumeration', 'Core/Event', 'Core/Extent', 'Core/ExtentTessellator', 'Core/FAR', 'Core/FeatureDetection', 'Core/Fullscreen', 'Core/GeographicProjection', 'Core/HeightmapTessellator', 'Core/HermitePolynomialApproximation', 'Core/HermiteSpline', 'Core/Iau2006XysData', 'Core/Iau2006XysSample', 'Core/IndexDatatype', 'Core/Intersect', 'Core/IntersectionTests', 'Core/Interval', 'Core/Iso8601', 'Core/JulianDate', 'Core/KeyboardEventModifier', 'Core/LagrangePolynomialApproximation', 'Core/LeapSecond', 'Core/LinearApproximation', 'Core/Math', 'Core/Matrix2', 'Core/Matrix3', 'Core/Matrix4', 'Core/MeshFilters', 'Core/Occluder', 'Core/OrientationInterpolator', 'Core/Plane', 'Core/PlaneTessellator', 'Core/PolygonPipeline', 'Core/PolylinePipeline', 'Core/PrimitiveType', 'Core/QuadraticRealPolynomial', 'Core/QuarticRealPolynomial', 'Core/Quaternion', 'Core/Queue', 'Core/Ray', 'Core/ReferenceFrame', 'Core/RequestErrorEvent', 'Core/RuntimeError', 'Core/ScreenSpaceEventHandler', 'Core/ScreenSpaceEventType', 'Core/Shapes', 'Core/Spherical', 'Core/TaskProcessor', 'Core/TimeConstants', 'Core/TimeInterval', 'Core/TimeIntervalCollection', 'Core/TimeStandard', 'Core/Tipsify', 'Core/Transforms', 'Core/TridiagonalSystemSolver', 'Core/Visibility', 'Core/WebMercatorProjection', 'Core/WindingOrder', 'Core/binarySearch', 'Core/buildModuleUrl', 'Core/clone', 'Core/combine', 'Core/computeSunPosition', 'Core/createGuid', 'Core/defaultValue', 'Core/destroyObject', 'Core/freezeObject', 'Core/getImagePixels', 'Core/isLeapYear', 'Core/jsonp', 'Core/loadArrayBuffer', 'Core/loadImage', 'Core/loadJson', 'Core/loadText', 'Core/loadXML', 'Core/pointInsideTriangle2D', 'Core/requestAnimationFrame', 'Core/throttleRequestByServer', 'Core/writeTextToCanvas', 'DynamicScene/CompositeDynamicObjectCollection', 'DynamicScene/CzmlBoolean', 'DynamicScene/CzmlCartesian2', 'DynamicScene/CzmlCartesian3', 'DynamicScene/CzmlCartographic', 'DynamicScene/CzmlColor', 'DynamicScene/CzmlDefaults', 'DynamicScene/CzmlHorizontalOrigin', 'DynamicScene/CzmlImage', 'DynamicScene/CzmlLabelStyle', 'DynamicScene/CzmlNumber', 'DynamicScene/CzmlString', 'DynamicScene/CzmlUnitCartesian3', 'DynamicScene/CzmlUnitQuaternion', 'DynamicScene/CzmlUnitSpherical', 'DynamicScene/CzmlVerticalOrigin', 'DynamicScene/DynamicBillboard', 'DynamicScene/DynamicBillboardVisualizer', 'DynamicScene/DynamicClock', 'DynamicScene/DynamicColorMaterial', 'DynamicScene/DynamicCone', 'DynamicScene/DynamicConeVisualizer', 'DynamicScene/DynamicConeVisualizerUsingCustomSensor', 'DynamicScene/DynamicDirectionsProperty', 'DynamicScene/DynamicEllipse', 'DynamicScene/DynamicEllipsoid', 'DynamicScene/DynamicEllipsoidVisualizer', 'DynamicScene/DynamicImageMaterial', 'DynamicScene/DynamicLabel', 'DynamicScene/DynamicLabelVisualizer', 'DynamicScene/DynamicMaterialProperty', 'DynamicScene/DynamicObject', 'DynamicScene/DynamicObjectCollection', 'DynamicScene/DynamicObjectView', 'DynamicScene/DynamicPath', 'DynamicScene/DynamicPathVisualizer', 'DynamicScene/DynamicPoint', 'DynamicScene/DynamicPointVisualizer', 'DynamicScene/DynamicPolygon', 'DynamicScene/DynamicPolygonVisualizer', 'DynamicScene/DynamicPolyline', 'DynamicScene/DynamicPolylineVisualizer', 'DynamicScene/DynamicPositionProperty', 'DynamicScene/DynamicProperty', 'DynamicScene/DynamicPyramid', 'DynamicScene/DynamicPyramidVisualizer', 'DynamicScene/DynamicVertexPositionsProperty', 'DynamicScene/ReferenceProperty', 'DynamicScene/VisualizerCollection', 'DynamicScene/processCzml', 'Renderer/BlendEquation', 'Renderer/BlendFunction', 'Renderer/BlendingState', 'Renderer/Buffer', 'Renderer/BufferUsage', 'Renderer/ClearCommand', 'Renderer/CommandLists', 'Renderer/Context', 'Renderer/CubeMap', 'Renderer/CubeMapFace', 'Renderer/CullFace', 'Renderer/DepthFunction', 'Renderer/DrawCommand', 'Renderer/Framebuffer', 'Renderer/MipmapHint', 'Renderer/PickFramebuffer', 'Renderer/PixelDatatype', 'Renderer/PixelFormat', 'Renderer/Renderbuffer', 'Renderer/RenderbufferFormat', 'Renderer/ShaderCache', 'Renderer/ShaderProgram', 'Renderer/StencilFunction', 'Renderer/StencilOperation', 'Renderer/Texture', 'Renderer/TextureAtlas', 'Renderer/TextureAtlasBuilder', 'Renderer/TextureMagnificationFilter', 'Renderer/TextureMinificationFilter', 'Renderer/TextureWrap', 'Renderer/UniformDatatype', 'Renderer/UniformState', 'Renderer/VertexArray', 'Renderer/VertexArrayFacade', 'Renderer/VertexLayout', 'Renderer/loadCubeMap', 'Scene/AnimationCollection', 'Scene/ArcGisImageServerTerrainProvider', 'Scene/ArcGisMapServerImageryProvider', 'Scene/Billboard', 'Scene/BillboardCollection', 'Scene/BingMapsImageryProvider', 'Scene/BingMapsStyle', 'Scene/Camera', 'Scene/CameraColumbusViewMode', 'Scene/CameraController', 'Scene/CameraEventAggregator', 'Scene/CameraEventType', 'Scene/CameraFlightPath', 'Scene/CentralBody', 'Scene/CentralBodySurface', 'Scene/CentralBodySurfaceShaderSet', 'Scene/CesiumTerrainProvider', 'Scene/ComplexConicSensorVolume', 'Scene/CompositePrimitive', 'Scene/CullingVolume', 'Scene/CustomSensorVolume', 'Scene/DiscardMissingTileImagePolicy', 'Scene/EllipsoidPrimitive', 'Scene/EllipsoidTerrainProvider', 'Scene/FrameState', 'Scene/FrustumCommands', 'Scene/GeographicTilingScheme', 'Scene/HeightmapTerrainData', 'Scene/HorizontalOrigin', 'Scene/Imagery', 'Scene/ImageryLayer', 'Scene/ImageryLayerCollection', 'Scene/ImageryProvider', 'Scene/ImageryState', 'Scene/Label', 'Scene/LabelCollection', 'Scene/LabelStyle', 'Scene/Material', 'Scene/NeverTileDiscardPolicy', 'Scene/OpenStreetMapImageryProvider', 'Scene/OrthographicFrustum', 'Scene/PerformanceDisplay', 'Scene/PerspectiveFrustum', 'Scene/PerspectiveOffCenterFrustum', 'Scene/Polygon', 'Scene/Polyline', 'Scene/PolylineCollection', 'Scene/Projections', 'Scene/RectangularPyramidSensorVolume', 'Scene/Scene', 'Scene/SceneMode', 'Scene/SceneTransitioner', 'Scene/ScreenSpaceCameraController', 'Scene/SensorVolumeCollection', 'Scene/SingleTileImageryProvider', 'Scene/SkyAtmosphere', 'Scene/SkyBox', 'Scene/TerrainData', 'Scene/TerrainMesh', 'Scene/TerrainProvider', 'Scene/TerrainState', 'Scene/TexturePool', 'Scene/Tile', 'Scene/TileCoordinatesImageryProvider', 'Scene/TileDiscardPolicy', 'Scene/TileImagery', 'Scene/TileLoadQueue', 'Scene/TileMapServiceImageryProvider', 'Scene/TileProviderError', 'Scene/TileReplacementQueue', 'Scene/TileState', 'Scene/TileTerrain', 'Scene/TilingScheme', 'Scene/VRTheWorldTerrainProvider', 'Scene/VerticalOrigin', 'Scene/ViewportQuad', 'Scene/WebMapServiceImageryProvider', 'Scene/WebMercatorTilingScheme', 'Scene/sampleTerrain', 'Shaders/BillboardCollectionFS', 'Shaders/BillboardCollectionVS', 'Shaders/BuiltinFunctions', 'Shaders/CentralBodyFS', 'Shaders/CentralBodyFSDepth', 'Shaders/CentralBodyFSPole', 'Shaders/CentralBodyVS', 'Shaders/CentralBodyVSDepth', 'Shaders/CentralBodyVSPole', 'Shaders/ComplexConicSensorVolumeFS', 'Shaders/ComplexConicSensorVolumeVS', 'Shaders/ConstructiveSolidGeometry', 'Shaders/CustomSensorVolumeFS', 'Shaders/CustomSensorVolumeVS', 'Shaders/EllipsoidFS', 'Shaders/EllipsoidVS', 'Shaders/Materials/AsphaltMaterial', 'Shaders/Materials/BlobMaterial', 'Shaders/Materials/BrickMaterial', 'Shaders/Materials/BumpMapMaterial', 'Shaders/Materials/CementMaterial', 'Shaders/Materials/CheckerboardMaterial', 'Shaders/Materials/DotMaterial', 'Shaders/Materials/ErosionMaterial', 'Shaders/Materials/FacetMaterial', 'Shaders/Materials/FresnelMaterial', 'Shaders/Materials/GrassMaterial', 'Shaders/Materials/GridMaterial', 'Shaders/Materials/NormalMapMaterial', 'Shaders/Materials/ReflectionMaterial', 'Shaders/Materials/RefractionMaterial', 'Shaders/Materials/RimLightingMaterial', 'Shaders/Materials/StripeMaterial', 'Shaders/Materials/TieDyeMaterial', 'Shaders/Materials/Water', 'Shaders/Materials/WoodMaterial', 'Shaders/Noise', 'Shaders/PolygonFS', 'Shaders/PolygonFSPick', 'Shaders/PolygonVS', 'Shaders/PolygonVSPick', 'Shaders/PolylineFS', 'Shaders/PolylineVS', 'Shaders/Ray', 'Shaders/ReprojectWebMercatorFS', 'Shaders/ReprojectWebMercatorVS', 'Shaders/SensorVolume', 'Shaders/SkyAtmosphereFS', 'Shaders/SkyAtmosphereVS', 'Shaders/SkyBoxFS', 'Shaders/SkyBoxVS', 'Shaders/ViewportQuadFS', 'Shaders/ViewportQuadVS', 'ThirdParty/Tween', 'ThirdParty/Uri', 'ThirdParty/knockout', 'ThirdParty/measureText', 'ThirdParty/sprintf', 'ThirdParty/when', 'Widgets/Animation/Animation', 'Widgets/Animation/AnimationViewModel', 'Widgets/BaseLayerPicker/BaseLayerPicker', 'Widgets/BaseLayerPicker/BaseLayerPickerViewModel', 'Widgets/BaseLayerPicker/ImageryProviderViewModel', 'Widgets/CesiumWidget/CesiumWidget', 'Widgets/ClockViewModel', 'Widgets/Command', 'Widgets/Fullscreen/FullscreenViewModel', 'Widgets/Fullscreen/FullscreenWidget', 'Widgets/Observable', 'Widgets/SceneModePicker/SceneModePicker', 'Widgets/SceneModePicker/SceneModePickerViewModel', 'Widgets/Timeline/Timeline', 'Widgets/Timeline/TimelineHighlightRange', 'Widgets/Timeline/TimelineTrack', 'Widgets/ToggleButtonViewModel', 'Widgets/createCommand'], function(Core_AxisAlignedBoundingBox, Core_BoundingRectangle, Core_BoundingSphere, Core_BoxTessellator, Core_Cartesian2, Core_Cartesian3, Core_Cartesian4, Core_Cartographic, Core_CatmullRomSpline, Core_Clock, Core_ClockRange, Core_ClockStep, Core_Color, Core_ComponentDatatype, Core_CubeMapEllipsoidTessellator, Core_CubicRealPolynomial, Core_DefaultProxy, Core_DeveloperError, Core_EarthOrientationParameters, Core_EarthOrientationParametersSample, Core_Ellipsoid, Core_EllipsoidTangentPlane, Core_EllipsoidalOccluder, Core_EncodedCartesian3, Core_Enumeration, Core_Event, Core_Extent, Core_ExtentTessellator, Core_FAR, Core_FeatureDetection, Core_Fullscreen, Core_GeographicProjection, Core_HeightmapTessellator, Core_HermitePolynomialApproximation, Core_HermiteSpline, Core_Iau2006XysData, Core_Iau2006XysSample, Core_IndexDatatype, Core_Intersect, Core_IntersectionTests, Core_Interval, Core_Iso8601, Core_JulianDate, Core_KeyboardEventModifier, Core_LagrangePolynomialApproximation, Core_LeapSecond, Core_LinearApproximation, Core_Math, Core_Matrix2, Core_Matrix3, Core_Matrix4, Core_MeshFilters, Core_Occluder, Core_OrientationInterpolator, Core_Plane, Core_PlaneTessellator, Core_PolygonPipeline, Core_PolylinePipeline, Core_PrimitiveType, Core_QuadraticRealPolynomial, Core_QuarticRealPolynomial, Core_Quaternion, Core_Queue, Core_Ray, Core_ReferenceFrame, Core_RequestErrorEvent, Core_RuntimeError, Core_ScreenSpaceEventHandler, Core_ScreenSpaceEventType, Core_Shapes, Core_Spherical, Core_TaskProcessor, Core_TimeConstants, Core_TimeInterval, Core_TimeIntervalCollection, Core_TimeStandard, Core_Tipsify, Core_Transforms, Core_TridiagonalSystemSolver, Core_Visibility, Core_WebMercatorProjection, Core_WindingOrder, Core_binarySearch, Core_buildModuleUrl, Core_clone, Core_combine, Core_computeSunPosition, Core_createGuid, Core_defaultValue, Core_destroyObject, Core_freezeObject, Core_getImagePixels, Core_isLeapYear, Core_jsonp, Core_loadArrayBuffer, Core_loadImage, Core_loadJson, Core_loadText, Core_loadXML, Core_pointInsideTriangle2D, Core_requestAnimationFrame, Core_throttleRequestByServer, Core_writeTextToCanvas, DynamicScene_CompositeDynamicObjectCollection, DynamicScene_CzmlBoolean, DynamicScene_CzmlCartesian2, DynamicScene_CzmlCartesian3, DynamicScene_CzmlCartographic, DynamicScene_CzmlColor, DynamicScene_CzmlDefaults, DynamicScene_CzmlHorizontalOrigin, DynamicScene_CzmlImage, DynamicScene_CzmlLabelStyle, DynamicScene_CzmlNumber, DynamicScene_CzmlString, DynamicScene_CzmlUnitCartesian3, DynamicScene_CzmlUnitQuaternion, DynamicScene_CzmlUnitSpherical, DynamicScene_CzmlVerticalOrigin, DynamicScene_DynamicBillboard, DynamicScene_DynamicBillboardVisualizer, DynamicScene_DynamicClock, DynamicScene_DynamicColorMaterial, DynamicScene_DynamicCone, DynamicScene_DynamicConeVisualizer, DynamicScene_DynamicConeVisualizerUsingCustomSensor, DynamicScene_DynamicDirectionsProperty, DynamicScene_DynamicEllipse, DynamicScene_DynamicEllipsoid, DynamicScene_DynamicEllipsoidVisualizer, DynamicScene_DynamicImageMaterial, DynamicScene_DynamicLabel, DynamicScene_DynamicLabelVisualizer, DynamicScene_DynamicMaterialProperty, DynamicScene_DynamicObject, DynamicScene_DynamicObjectCollection, DynamicScene_DynamicObjectView, DynamicScene_DynamicPath, DynamicScene_DynamicPathVisualizer, DynamicScene_DynamicPoint, DynamicScene_DynamicPointVisualizer, DynamicScene_DynamicPolygon, DynamicScene_DynamicPolygonVisualizer, DynamicScene_DynamicPolyline, DynamicScene_DynamicPolylineVisualizer, DynamicScene_DynamicPositionProperty, DynamicScene_DynamicProperty, DynamicScene_DynamicPyramid, DynamicScene_DynamicPyramidVisualizer, DynamicScene_DynamicVertexPositionsProperty, DynamicScene_ReferenceProperty, DynamicScene_VisualizerCollection, DynamicScene_processCzml, Renderer_BlendEquation, Renderer_BlendFunction, Renderer_BlendingState, Renderer_Buffer, Renderer_BufferUsage, Renderer_ClearCommand, Renderer_CommandLists, Renderer_Context, Renderer_CubeMap, Renderer_CubeMapFace, Renderer_CullFace, Renderer_DepthFunction, Renderer_DrawCommand, Renderer_Framebuffer, Renderer_MipmapHint, Renderer_PickFramebuffer, Renderer_PixelDatatype, Renderer_PixelFormat, Renderer_Renderbuffer, Renderer_RenderbufferFormat, Renderer_ShaderCache, Renderer_ShaderProgram, Renderer_StencilFunction, Renderer_StencilOperation, Renderer_Texture, Renderer_TextureAtlas, Renderer_TextureAtlasBuilder, Renderer_TextureMagnificationFilter, Renderer_TextureMinificationFilter, Renderer_TextureWrap, Renderer_UniformDatatype, Renderer_UniformState, Renderer_VertexArray, Renderer_VertexArrayFacade, Renderer_VertexLayout, Renderer_loadCubeMap, Scene_AnimationCollection, Scene_ArcGisImageServerTerrainProvider, Scene_ArcGisMapServerImageryProvider, Scene_Billboard, Scene_BillboardCollection, Scene_BingMapsImageryProvider, Scene_BingMapsStyle, Scene_Camera, Scene_CameraColumbusViewMode, Scene_CameraController, Scene_CameraEventAggregator, Scene_CameraEventType, Scene_CameraFlightPath, Scene_CentralBody, Scene_CentralBodySurface, Scene_CentralBodySurfaceShaderSet, Scene_CesiumTerrainProvider, Scene_ComplexConicSensorVolume, Scene_CompositePrimitive, Scene_CullingVolume, Scene_CustomSensorVolume, Scene_DiscardMissingTileImagePolicy, Scene_EllipsoidPrimitive, Scene_EllipsoidTerrainProvider, Scene_FrameState, Scene_FrustumCommands, Scene_GeographicTilingScheme, Scene_HeightmapTerrainData, Scene_HorizontalOrigin, Scene_Imagery, Scene_ImageryLayer, Scene_ImageryLayerCollection, Scene_ImageryProvider, Scene_ImageryState, Scene_Label, Scene_LabelCollection, Scene_LabelStyle, Scene_Material, Scene_NeverTileDiscardPolicy, Scene_OpenStreetMapImageryProvider, Scene_OrthographicFrustum, Scene_PerformanceDisplay, Scene_PerspectiveFrustum, Scene_PerspectiveOffCenterFrustum, Scene_Polygon, Scene_Polyline, Scene_PolylineCollection, Scene_Projections, Scene_RectangularPyramidSensorVolume, Scene_Scene, Scene_SceneMode, Scene_SceneTransitioner, Scene_ScreenSpaceCameraController, Scene_SensorVolumeCollection, Scene_SingleTileImageryProvider, Scene_SkyAtmosphere, Scene_SkyBox, Scene_TerrainData, Scene_TerrainMesh, Scene_TerrainProvider, Scene_TerrainState, Scene_TexturePool, Scene_Tile, Scene_TileCoordinatesImageryProvider, Scene_TileDiscardPolicy, Scene_TileImagery, Scene_TileLoadQueue, Scene_TileMapServiceImageryProvider, Scene_TileProviderError, Scene_TileReplacementQueue, Scene_TileState, Scene_TileTerrain, Scene_TilingScheme, Scene_VRTheWorldTerrainProvider, Scene_VerticalOrigin, Scene_ViewportQuad, Scene_WebMapServiceImageryProvider, Scene_WebMercatorTilingScheme, Scene_sampleTerrain, Shaders_BillboardCollectionFS, Shaders_BillboardCollectionVS, Shaders_BuiltinFunctions, Shaders_CentralBodyFS, Shaders_CentralBodyFSDepth, Shaders_CentralBodyFSPole, Shaders_CentralBodyVS, Shaders_CentralBodyVSDepth, Shaders_CentralBodyVSPole, Shaders_ComplexConicSensorVolumeFS, Shaders_ComplexConicSensorVolumeVS, Shaders_ConstructiveSolidGeometry, Shaders_CustomSensorVolumeFS, Shaders_CustomSensorVolumeVS, Shaders_EllipsoidFS, Shaders_EllipsoidVS, Shaders_Materials_AsphaltMaterial, Shaders_Materials_BlobMaterial, Shaders_Materials_BrickMaterial, Shaders_Materials_BumpMapMaterial, Shaders_Materials_CementMaterial, Shaders_Materials_CheckerboardMaterial, Shaders_Materials_DotMaterial, Shaders_Materials_ErosionMaterial, Shaders_Materials_FacetMaterial, Shaders_Materials_FresnelMaterial, Shaders_Materials_GrassMaterial, Shaders_Materials_GridMaterial, Shaders_Materials_NormalMapMaterial, Shaders_Materials_ReflectionMaterial, Shaders_Materials_RefractionMaterial, Shaders_Materials_RimLightingMaterial, Shaders_Materials_StripeMaterial, Shaders_Materials_TieDyeMaterial, Shaders_Materials_Water, Shaders_Materials_WoodMaterial, Shaders_Noise, Shaders_PolygonFS, Shaders_PolygonFSPick, Shaders_PolygonVS, Shaders_PolygonVSPick, Shaders_PolylineFS, Shaders_PolylineVS, Shaders_Ray, Shaders_ReprojectWebMercatorFS, Shaders_ReprojectWebMercatorVS, Shaders_SensorVolume, Shaders_SkyAtmosphereFS, Shaders_SkyAtmosphereVS, Shaders_SkyBoxFS, Shaders_SkyBoxVS, Shaders_ViewportQuadFS, Shaders_ViewportQuadVS, ThirdParty_Tween, ThirdParty_Uri, ThirdParty_knockout, ThirdParty_measureText, ThirdParty_sprintf, ThirdParty_when, Widgets_Animation_Animation, Widgets_Animation_AnimationViewModel, Widgets_BaseLayerPicker_BaseLayerPicker, Widgets_BaseLayerPicker_BaseLayerPickerViewModel, Widgets_BaseLayerPicker_ImageryProviderViewModel, Widgets_CesiumWidget_CesiumWidget, Widgets_ClockViewModel, Widgets_Command, Widgets_Fullscreen_FullscreenViewModel, Widgets_Fullscreen_FullscreenWidget, Widgets_Observable, Widgets_SceneModePicker_SceneModePicker, Widgets_SceneModePicker_SceneModePickerViewModel, Widgets_Timeline_Timeline, Widgets_Timeline_TimelineHighlightRange, Widgets_Timeline_TimelineTrack, Widgets_ToggleButtonViewModel, Widgets_createCommand) {

    var Cesium = {
        _shaders : {}
    };
    Cesium.AxisAlignedBoundingBox = Core_AxisAlignedBoundingBox;
    Cesium.BoundingRectangle = Core_BoundingRectangle;
    Cesium.BoundingSphere = Core_BoundingSphere;
    Cesium.BoxTessellator = Core_BoxTessellator;
    Cesium.Cartesian2 = Core_Cartesian2;
    Cesium.Cartesian3 = Core_Cartesian3;
    Cesium.Cartesian4 = Core_Cartesian4;
    Cesium.Cartographic = Core_Cartographic;
    Cesium.CatmullRomSpline = Core_CatmullRomSpline;
    Cesium.Clock = Core_Clock;
    Cesium.ClockRange = Core_ClockRange;
    Cesium.ClockStep = Core_ClockStep;
    Cesium.Color = Core_Color;
    Cesium.ComponentDatatype = Core_ComponentDatatype;
    Cesium.CubeMapEllipsoidTessellator = Core_CubeMapEllipsoidTessellator;
    Cesium.CubicRealPolynomial = Core_CubicRealPolynomial;
    Cesium.DefaultProxy = Core_DefaultProxy;
    Cesium.DeveloperError = Core_DeveloperError;
    Cesium.EarthOrientationParameters = Core_EarthOrientationParameters;
    Cesium.EarthOrientationParametersSample = Core_EarthOrientationParametersSample;
    Cesium.Ellipsoid = Core_Ellipsoid;
    Cesium.EllipsoidTangentPlane = Core_EllipsoidTangentPlane;
    Cesium.EllipsoidalOccluder = Core_EllipsoidalOccluder;
    Cesium.EncodedCartesian3 = Core_EncodedCartesian3;
    Cesium.Enumeration = Core_Enumeration;
    Cesium.Event = Core_Event;
    Cesium.Extent = Core_Extent;
    Cesium.ExtentTessellator = Core_ExtentTessellator;
    Cesium.FAR = Core_FAR;
    Cesium.FeatureDetection = Core_FeatureDetection;
    Cesium.Fullscreen = Core_Fullscreen;
    Cesium.GeographicProjection = Core_GeographicProjection;
    Cesium.HeightmapTessellator = Core_HeightmapTessellator;
    Cesium.HermitePolynomialApproximation = Core_HermitePolynomialApproximation;
    Cesium.HermiteSpline = Core_HermiteSpline;
    Cesium.Iau2006XysData = Core_Iau2006XysData;
    Cesium.Iau2006XysSample = Core_Iau2006XysSample;
    Cesium.IndexDatatype = Core_IndexDatatype;
    Cesium.Intersect = Core_Intersect;
    Cesium.IntersectionTests = Core_IntersectionTests;
    Cesium.Interval = Core_Interval;
    Cesium.Iso8601 = Core_Iso8601;
    Cesium.JulianDate = Core_JulianDate;
    Cesium.KeyboardEventModifier = Core_KeyboardEventModifier;
    Cesium.LagrangePolynomialApproximation = Core_LagrangePolynomialApproximation;
    Cesium.LeapSecond = Core_LeapSecond;
    Cesium.LinearApproximation = Core_LinearApproximation;
    Cesium.Math = Core_Math;
    Cesium.Matrix2 = Core_Matrix2;
    Cesium.Matrix3 = Core_Matrix3;
    Cesium.Matrix4 = Core_Matrix4;
    Cesium.MeshFilters = Core_MeshFilters;
    Cesium.Occluder = Core_Occluder;
    Cesium.OrientationInterpolator = Core_OrientationInterpolator;
    Cesium.Plane = Core_Plane;
    Cesium.PlaneTessellator = Core_PlaneTessellator;
    Cesium.PolygonPipeline = Core_PolygonPipeline;
    Cesium.PolylinePipeline = Core_PolylinePipeline;
    Cesium.PrimitiveType = Core_PrimitiveType;
    Cesium.QuadraticRealPolynomial = Core_QuadraticRealPolynomial;
    Cesium.QuarticRealPolynomial = Core_QuarticRealPolynomial;
    Cesium.Quaternion = Core_Quaternion;
    Cesium.Queue = Core_Queue;
    Cesium.Ray = Core_Ray;
    Cesium.ReferenceFrame = Core_ReferenceFrame;
    Cesium.RequestErrorEvent = Core_RequestErrorEvent;
    Cesium.RuntimeError = Core_RuntimeError;
    Cesium.ScreenSpaceEventHandler = Core_ScreenSpaceEventHandler;
    Cesium.ScreenSpaceEventType = Core_ScreenSpaceEventType;
    Cesium.Shapes = Core_Shapes;
    Cesium.Spherical = Core_Spherical;
    Cesium.TaskProcessor = Core_TaskProcessor;
    Cesium.TimeConstants = Core_TimeConstants;
    Cesium.TimeInterval = Core_TimeInterval;
    Cesium.TimeIntervalCollection = Core_TimeIntervalCollection;
    Cesium.TimeStandard = Core_TimeStandard;
    Cesium.Tipsify = Core_Tipsify;
    Cesium.Transforms = Core_Transforms;
    Cesium.TridiagonalSystemSolver = Core_TridiagonalSystemSolver;
    Cesium.Visibility = Core_Visibility;
    Cesium.WebMercatorProjection = Core_WebMercatorProjection;
    Cesium.WindingOrder = Core_WindingOrder;
    Cesium.binarySearch = Core_binarySearch;
    Cesium.buildModuleUrl = Core_buildModuleUrl;
    Cesium.clone = Core_clone;
    Cesium.combine = Core_combine;
    Cesium.computeSunPosition = Core_computeSunPosition;
    Cesium.createGuid = Core_createGuid;
    Cesium.defaultValue = Core_defaultValue;
    Cesium.destroyObject = Core_destroyObject;
    Cesium.freezeObject = Core_freezeObject;
    Cesium.getImagePixels = Core_getImagePixels;
    Cesium.isLeapYear = Core_isLeapYear;
    Cesium.jsonp = Core_jsonp;
    Cesium.loadArrayBuffer = Core_loadArrayBuffer;
    Cesium.loadImage = Core_loadImage;
    Cesium.loadJson = Core_loadJson;
    Cesium.loadText = Core_loadText;
    Cesium.loadXML = Core_loadXML;
    Cesium.pointInsideTriangle2D = Core_pointInsideTriangle2D;
    Cesium.requestAnimationFrame = Core_requestAnimationFrame;
    Cesium.throttleRequestByServer = Core_throttleRequestByServer;
    Cesium.writeTextToCanvas = Core_writeTextToCanvas;
    Cesium.CompositeDynamicObjectCollection = DynamicScene_CompositeDynamicObjectCollection;
    Cesium.CzmlBoolean = DynamicScene_CzmlBoolean;
    Cesium.CzmlCartesian2 = DynamicScene_CzmlCartesian2;
    Cesium.CzmlCartesian3 = DynamicScene_CzmlCartesian3;
    Cesium.CzmlCartographic = DynamicScene_CzmlCartographic;
    Cesium.CzmlColor = DynamicScene_CzmlColor;
    Cesium.CzmlDefaults = DynamicScene_CzmlDefaults;
    Cesium.CzmlHorizontalOrigin = DynamicScene_CzmlHorizontalOrigin;
    Cesium.CzmlImage = DynamicScene_CzmlImage;
    Cesium.CzmlLabelStyle = DynamicScene_CzmlLabelStyle;
    Cesium.CzmlNumber = DynamicScene_CzmlNumber;
    Cesium.CzmlString = DynamicScene_CzmlString;
    Cesium.CzmlUnitCartesian3 = DynamicScene_CzmlUnitCartesian3;
    Cesium.CzmlUnitQuaternion = DynamicScene_CzmlUnitQuaternion;
    Cesium.CzmlUnitSpherical = DynamicScene_CzmlUnitSpherical;
    Cesium.CzmlVerticalOrigin = DynamicScene_CzmlVerticalOrigin;
    Cesium.DynamicBillboard = DynamicScene_DynamicBillboard;
    Cesium.DynamicBillboardVisualizer = DynamicScene_DynamicBillboardVisualizer;
    Cesium.DynamicClock = DynamicScene_DynamicClock;
    Cesium.DynamicColorMaterial = DynamicScene_DynamicColorMaterial;
    Cesium.DynamicCone = DynamicScene_DynamicCone;
    Cesium.DynamicConeVisualizer = DynamicScene_DynamicConeVisualizer;
    Cesium.DynamicConeVisualizerUsingCustomSensor = DynamicScene_DynamicConeVisualizerUsingCustomSensor;
    Cesium.DynamicDirectionsProperty = DynamicScene_DynamicDirectionsProperty;
    Cesium.DynamicEllipse = DynamicScene_DynamicEllipse;
    Cesium.DynamicEllipsoid = DynamicScene_DynamicEllipsoid;
    Cesium.DynamicEllipsoidVisualizer = DynamicScene_DynamicEllipsoidVisualizer;
    Cesium.DynamicImageMaterial = DynamicScene_DynamicImageMaterial;
    Cesium.DynamicLabel = DynamicScene_DynamicLabel;
    Cesium.DynamicLabelVisualizer = DynamicScene_DynamicLabelVisualizer;
    Cesium.DynamicMaterialProperty = DynamicScene_DynamicMaterialProperty;
    Cesium.DynamicObject = DynamicScene_DynamicObject;
    Cesium.DynamicObjectCollection = DynamicScene_DynamicObjectCollection;
    Cesium.DynamicObjectView = DynamicScene_DynamicObjectView;
    Cesium.DynamicPath = DynamicScene_DynamicPath;
    Cesium.DynamicPathVisualizer = DynamicScene_DynamicPathVisualizer;
    Cesium.DynamicPoint = DynamicScene_DynamicPoint;
    Cesium.DynamicPointVisualizer = DynamicScene_DynamicPointVisualizer;
    Cesium.DynamicPolygon = DynamicScene_DynamicPolygon;
    Cesium.DynamicPolygonVisualizer = DynamicScene_DynamicPolygonVisualizer;
    Cesium.DynamicPolyline = DynamicScene_DynamicPolyline;
    Cesium.DynamicPolylineVisualizer = DynamicScene_DynamicPolylineVisualizer;
    Cesium.DynamicPositionProperty = DynamicScene_DynamicPositionProperty;
    Cesium.DynamicProperty = DynamicScene_DynamicProperty;
    Cesium.DynamicPyramid = DynamicScene_DynamicPyramid;
    Cesium.DynamicPyramidVisualizer = DynamicScene_DynamicPyramidVisualizer;
    Cesium.DynamicVertexPositionsProperty = DynamicScene_DynamicVertexPositionsProperty;
    Cesium.ReferenceProperty = DynamicScene_ReferenceProperty;
    Cesium.VisualizerCollection = DynamicScene_VisualizerCollection;
    Cesium.processCzml = DynamicScene_processCzml;
    Cesium.BlendEquation = Renderer_BlendEquation;
    Cesium.BlendFunction = Renderer_BlendFunction;
    Cesium.BlendingState = Renderer_BlendingState;
    Cesium.Buffer = Renderer_Buffer;
    Cesium.BufferUsage = Renderer_BufferUsage;
    Cesium.ClearCommand = Renderer_ClearCommand;
    Cesium.CommandLists = Renderer_CommandLists;
    Cesium.Context = Renderer_Context;
    Cesium.CubeMap = Renderer_CubeMap;
    Cesium.CubeMapFace = Renderer_CubeMapFace;
    Cesium.CullFace = Renderer_CullFace;
    Cesium.DepthFunction = Renderer_DepthFunction;
    Cesium.DrawCommand = Renderer_DrawCommand;
    Cesium.Framebuffer = Renderer_Framebuffer;
    Cesium.MipmapHint = Renderer_MipmapHint;
    Cesium.PickFramebuffer = Renderer_PickFramebuffer;
    Cesium.PixelDatatype = Renderer_PixelDatatype;
    Cesium.PixelFormat = Renderer_PixelFormat;
    Cesium.Renderbuffer = Renderer_Renderbuffer;
    Cesium.RenderbufferFormat = Renderer_RenderbufferFormat;
    Cesium.ShaderCache = Renderer_ShaderCache;
    Cesium.ShaderProgram = Renderer_ShaderProgram;
    Cesium.StencilFunction = Renderer_StencilFunction;
    Cesium.StencilOperation = Renderer_StencilOperation;
    Cesium.Texture = Renderer_Texture;
    Cesium.TextureAtlas = Renderer_TextureAtlas;
    Cesium.TextureAtlasBuilder = Renderer_TextureAtlasBuilder;
    Cesium.TextureMagnificationFilter = Renderer_TextureMagnificationFilter;
    Cesium.TextureMinificationFilter = Renderer_TextureMinificationFilter;
    Cesium.TextureWrap = Renderer_TextureWrap;
    Cesium.UniformDatatype = Renderer_UniformDatatype;
    Cesium.UniformState = Renderer_UniformState;
    Cesium.VertexArray = Renderer_VertexArray;
    Cesium.VertexArrayFacade = Renderer_VertexArrayFacade;
    Cesium.VertexLayout = Renderer_VertexLayout;
    Cesium.loadCubeMap = Renderer_loadCubeMap;
    Cesium.AnimationCollection = Scene_AnimationCollection;
    Cesium.ArcGisImageServerTerrainProvider = Scene_ArcGisImageServerTerrainProvider;
    Cesium.ArcGisMapServerImageryProvider = Scene_ArcGisMapServerImageryProvider;
    Cesium.Billboard = Scene_Billboard;
    Cesium.BillboardCollection = Scene_BillboardCollection;
    Cesium.BingMapsImageryProvider = Scene_BingMapsImageryProvider;
    Cesium.BingMapsStyle = Scene_BingMapsStyle;
    Cesium.Camera = Scene_Camera;
    Cesium.CameraColumbusViewMode = Scene_CameraColumbusViewMode;
    Cesium.CameraController = Scene_CameraController;
    Cesium.CameraEventAggregator = Scene_CameraEventAggregator;
    Cesium.CameraEventType = Scene_CameraEventType;
    Cesium.CameraFlightPath = Scene_CameraFlightPath;
    Cesium.CentralBody = Scene_CentralBody;
    Cesium.CentralBodySurface = Scene_CentralBodySurface;
    Cesium.CentralBodySurfaceShaderSet = Scene_CentralBodySurfaceShaderSet;
    Cesium.CesiumTerrainProvider = Scene_CesiumTerrainProvider;
    Cesium.ComplexConicSensorVolume = Scene_ComplexConicSensorVolume;
    Cesium.CompositePrimitive = Scene_CompositePrimitive;
    Cesium.CullingVolume = Scene_CullingVolume;
    Cesium.CustomSensorVolume = Scene_CustomSensorVolume;
    Cesium.DiscardMissingTileImagePolicy = Scene_DiscardMissingTileImagePolicy;
    Cesium.EllipsoidPrimitive = Scene_EllipsoidPrimitive;
    Cesium.EllipsoidTerrainProvider = Scene_EllipsoidTerrainProvider;
    Cesium.FrameState = Scene_FrameState;
    Cesium.FrustumCommands = Scene_FrustumCommands;
    Cesium.GeographicTilingScheme = Scene_GeographicTilingScheme;
    Cesium.HeightmapTerrainData = Scene_HeightmapTerrainData;
    Cesium.HorizontalOrigin = Scene_HorizontalOrigin;
    Cesium.Imagery = Scene_Imagery;
    Cesium.ImageryLayer = Scene_ImageryLayer;
    Cesium.ImageryLayerCollection = Scene_ImageryLayerCollection;
    Cesium.ImageryProvider = Scene_ImageryProvider;
    Cesium.ImageryState = Scene_ImageryState;
    Cesium.Label = Scene_Label;
    Cesium.LabelCollection = Scene_LabelCollection;
    Cesium.LabelStyle = Scene_LabelStyle;
    Cesium.Material = Scene_Material;
    Cesium.NeverTileDiscardPolicy = Scene_NeverTileDiscardPolicy;
    Cesium.OpenStreetMapImageryProvider = Scene_OpenStreetMapImageryProvider;
    Cesium.OrthographicFrustum = Scene_OrthographicFrustum;
    Cesium.PerformanceDisplay = Scene_PerformanceDisplay;
    Cesium.PerspectiveFrustum = Scene_PerspectiveFrustum;
    Cesium.PerspectiveOffCenterFrustum = Scene_PerspectiveOffCenterFrustum;
    Cesium.Polygon = Scene_Polygon;
    Cesium.Polyline = Scene_Polyline;
    Cesium.PolylineCollection = Scene_PolylineCollection;
    Cesium.Projections = Scene_Projections;
    Cesium.RectangularPyramidSensorVolume = Scene_RectangularPyramidSensorVolume;
    Cesium.Scene = Scene_Scene;
    Cesium.SceneMode = Scene_SceneMode;
    Cesium.SceneTransitioner = Scene_SceneTransitioner;
    Cesium.ScreenSpaceCameraController = Scene_ScreenSpaceCameraController;
    Cesium.SensorVolumeCollection = Scene_SensorVolumeCollection;
    Cesium.SingleTileImageryProvider = Scene_SingleTileImageryProvider;
    Cesium.SkyAtmosphere = Scene_SkyAtmosphere;
    Cesium.SkyBox = Scene_SkyBox;
    Cesium.TerrainData = Scene_TerrainData;
    Cesium.TerrainMesh = Scene_TerrainMesh;
    Cesium.TerrainProvider = Scene_TerrainProvider;
    Cesium.TerrainState = Scene_TerrainState;
    Cesium.TexturePool = Scene_TexturePool;
    Cesium.Tile = Scene_Tile;
    Cesium.TileCoordinatesImageryProvider = Scene_TileCoordinatesImageryProvider;
    Cesium.TileDiscardPolicy = Scene_TileDiscardPolicy;
    Cesium.TileImagery = Scene_TileImagery;
    Cesium.TileLoadQueue = Scene_TileLoadQueue;
    Cesium.TileMapServiceImageryProvider = Scene_TileMapServiceImageryProvider;
    Cesium.TileProviderError = Scene_TileProviderError;
    Cesium.TileReplacementQueue = Scene_TileReplacementQueue;
    Cesium.TileState = Scene_TileState;
    Cesium.TileTerrain = Scene_TileTerrain;
    Cesium.TilingScheme = Scene_TilingScheme;
    Cesium.VRTheWorldTerrainProvider = Scene_VRTheWorldTerrainProvider;
    Cesium.VerticalOrigin = Scene_VerticalOrigin;
    Cesium.ViewportQuad = Scene_ViewportQuad;
    Cesium.WebMapServiceImageryProvider = Scene_WebMapServiceImageryProvider;
    Cesium.WebMercatorTilingScheme = Scene_WebMercatorTilingScheme;
    Cesium.sampleTerrain = Scene_sampleTerrain;
    Cesium._shaders.BillboardCollectionFS = Shaders_BillboardCollectionFS;
    Cesium._shaders.BillboardCollectionVS = Shaders_BillboardCollectionVS;
    Cesium._shaders.BuiltinFunctions = Shaders_BuiltinFunctions;
    Cesium._shaders.CentralBodyFS = Shaders_CentralBodyFS;
    Cesium._shaders.CentralBodyFSDepth = Shaders_CentralBodyFSDepth;
    Cesium._shaders.CentralBodyFSPole = Shaders_CentralBodyFSPole;
    Cesium._shaders.CentralBodyVS = Shaders_CentralBodyVS;
    Cesium._shaders.CentralBodyVSDepth = Shaders_CentralBodyVSDepth;
    Cesium._shaders.CentralBodyVSPole = Shaders_CentralBodyVSPole;
    Cesium._shaders.ComplexConicSensorVolumeFS = Shaders_ComplexConicSensorVolumeFS;
    Cesium._shaders.ComplexConicSensorVolumeVS = Shaders_ComplexConicSensorVolumeVS;
    Cesium._shaders.ConstructiveSolidGeometry = Shaders_ConstructiveSolidGeometry;
    Cesium._shaders.CustomSensorVolumeFS = Shaders_CustomSensorVolumeFS;
    Cesium._shaders.CustomSensorVolumeVS = Shaders_CustomSensorVolumeVS;
    Cesium._shaders.EllipsoidFS = Shaders_EllipsoidFS;
    Cesium._shaders.EllipsoidVS = Shaders_EllipsoidVS;
    Cesium._shaders.AsphaltMaterial = Shaders_Materials_AsphaltMaterial;
    Cesium._shaders.BlobMaterial = Shaders_Materials_BlobMaterial;
    Cesium._shaders.BrickMaterial = Shaders_Materials_BrickMaterial;
    Cesium._shaders.BumpMapMaterial = Shaders_Materials_BumpMapMaterial;
    Cesium._shaders.CementMaterial = Shaders_Materials_CementMaterial;
    Cesium._shaders.CheckerboardMaterial = Shaders_Materials_CheckerboardMaterial;
    Cesium._shaders.DotMaterial = Shaders_Materials_DotMaterial;
    Cesium._shaders.ErosionMaterial = Shaders_Materials_ErosionMaterial;
    Cesium._shaders.FacetMaterial = Shaders_Materials_FacetMaterial;
    Cesium._shaders.FresnelMaterial = Shaders_Materials_FresnelMaterial;
    Cesium._shaders.GrassMaterial = Shaders_Materials_GrassMaterial;
    Cesium._shaders.GridMaterial = Shaders_Materials_GridMaterial;
    Cesium._shaders.NormalMapMaterial = Shaders_Materials_NormalMapMaterial;
    Cesium._shaders.ReflectionMaterial = Shaders_Materials_ReflectionMaterial;
    Cesium._shaders.RefractionMaterial = Shaders_Materials_RefractionMaterial;
    Cesium._shaders.RimLightingMaterial = Shaders_Materials_RimLightingMaterial;
    Cesium._shaders.StripeMaterial = Shaders_Materials_StripeMaterial;
    Cesium._shaders.TieDyeMaterial = Shaders_Materials_TieDyeMaterial;
    Cesium._shaders.Water = Shaders_Materials_Water;
    Cesium._shaders.WoodMaterial = Shaders_Materials_WoodMaterial;
    Cesium._shaders.Noise = Shaders_Noise;
    Cesium._shaders.PolygonFS = Shaders_PolygonFS;
    Cesium._shaders.PolygonFSPick = Shaders_PolygonFSPick;
    Cesium._shaders.PolygonVS = Shaders_PolygonVS;
    Cesium._shaders.PolygonVSPick = Shaders_PolygonVSPick;
    Cesium._shaders.PolylineFS = Shaders_PolylineFS;
    Cesium._shaders.PolylineVS = Shaders_PolylineVS;
    Cesium._shaders.Ray = Shaders_Ray;
    Cesium._shaders.ReprojectWebMercatorFS = Shaders_ReprojectWebMercatorFS;
    Cesium._shaders.ReprojectWebMercatorVS = Shaders_ReprojectWebMercatorVS;
    Cesium._shaders.SensorVolume = Shaders_SensorVolume;
    Cesium._shaders.SkyAtmosphereFS = Shaders_SkyAtmosphereFS;
    Cesium._shaders.SkyAtmosphereVS = Shaders_SkyAtmosphereVS;
    Cesium._shaders.SkyBoxFS = Shaders_SkyBoxFS;
    Cesium._shaders.SkyBoxVS = Shaders_SkyBoxVS;
    Cesium._shaders.ViewportQuadFS = Shaders_ViewportQuadFS;
    Cesium._shaders.ViewportQuadVS = Shaders_ViewportQuadVS;
    Cesium.Tween = ThirdParty_Tween;
    Cesium.Uri = ThirdParty_Uri;
    Cesium.knockout = ThirdParty_knockout;
    Cesium.measureText = ThirdParty_measureText;
    Cesium.sprintf = ThirdParty_sprintf;
    Cesium.when = ThirdParty_when;
    Cesium.Animation = Widgets_Animation_Animation;
    Cesium.AnimationViewModel = Widgets_Animation_AnimationViewModel;
    Cesium.BaseLayerPicker = Widgets_BaseLayerPicker_BaseLayerPicker;
    Cesium.BaseLayerPickerViewModel = Widgets_BaseLayerPicker_BaseLayerPickerViewModel;
    Cesium.ImageryProviderViewModel = Widgets_BaseLayerPicker_ImageryProviderViewModel;
    Cesium.CesiumWidget = Widgets_CesiumWidget_CesiumWidget;
    Cesium.ClockViewModel = Widgets_ClockViewModel;
    Cesium.Command = Widgets_Command;
    Cesium.FullscreenViewModel = Widgets_Fullscreen_FullscreenViewModel;
    Cesium.FullscreenWidget = Widgets_Fullscreen_FullscreenWidget;
    Cesium.Observable = Widgets_Observable;
    Cesium.SceneModePicker = Widgets_SceneModePicker_SceneModePicker;
    Cesium.SceneModePickerViewModel = Widgets_SceneModePicker_SceneModePickerViewModel;
    Cesium.Timeline = Widgets_Timeline_Timeline;
    Cesium.TimelineHighlightRange = Widgets_Timeline_TimelineHighlightRange;
    Cesium.TimelineTrack = Widgets_Timeline_TimelineTrack;
    Cesium.ToggleButtonViewModel = Widgets_ToggleButtonViewModel;
    Cesium.createCommand = Widgets_createCommand;
    return Cesium;
});
