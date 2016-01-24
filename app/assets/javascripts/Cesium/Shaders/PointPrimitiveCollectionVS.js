//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "uniform float u_maxTotalPointSize;\n\
attribute vec4 positionHighAndSize;\n\
attribute vec4 positionLowAndOutline;\n\
attribute vec4 compressedAttribute0;\n\
attribute vec4 compressedAttribute1;\n\
attribute vec4 scaleByDistance;\n\
varying vec4 v_color;\n\
varying vec4 v_outlineColor;\n\
varying float v_innerPercent;\n\
varying float v_pixelDistance;\n\
#ifdef RENDER_FOR_PICK\n\
varying vec4 v_pickColor;\n\
#endif\n\
const float SHIFT_LEFT8 = 256.0;\n\
const float SHIFT_RIGHT8 = 1.0 / 256.0;\n\
void main()\n\
{\n\
vec3 positionHigh = positionHighAndSize.xyz;\n\
vec3 positionLow = positionLowAndOutline.xyz;\n\
float outlineWidthBothSides = 2.0 * positionLowAndOutline.w;\n\
float totalSize = positionHighAndSize.w + outlineWidthBothSides;\n\
float outlinePercent = outlineWidthBothSides / totalSize;\n\
totalSize *= czm_resolutionScale;\n\
totalSize += 3.0;\n\
float temp = compressedAttribute1.x * SHIFT_RIGHT8;\n\
float show = floor(temp);\n\
#ifdef EYE_DISTANCE_TRANSLUCENCY\n\
vec4 translucencyByDistance;\n\
translucencyByDistance.x = compressedAttribute1.z;\n\
translucencyByDistance.z = compressedAttribute1.w;\n\
translucencyByDistance.y = ((temp - floor(temp)) * SHIFT_LEFT8) / 255.0;\n\
temp = compressedAttribute1.y * SHIFT_RIGHT8;\n\
translucencyByDistance.w = ((temp - floor(temp)) * SHIFT_LEFT8) / 255.0;\n\
#endif\n\
vec4 color;\n\
vec4 outlineColor;\n\
#ifdef RENDER_FOR_PICK\n\
color = vec4(0.0);\n\
outlineColor = vec4(0.0);\n\
vec4 pickColor;\n\
temp = compressedAttribute0.z * SHIFT_RIGHT8;\n\
pickColor.b = (temp - floor(temp)) * SHIFT_LEFT8;\n\
temp = floor(temp) * SHIFT_RIGHT8;\n\
pickColor.g = (temp - floor(temp)) * SHIFT_LEFT8;\n\
pickColor.r = floor(temp);\n\
#else\n\
temp = compressedAttribute0.x * SHIFT_RIGHT8;\n\
color.b = (temp - floor(temp)) * SHIFT_LEFT8;\n\
temp = floor(temp) * SHIFT_RIGHT8;\n\
color.g = (temp - floor(temp)) * SHIFT_LEFT8;\n\
color.r = floor(temp);\n\
temp = compressedAttribute0.y * SHIFT_RIGHT8;\n\
outlineColor.b = (temp - floor(temp)) * SHIFT_LEFT8;\n\
temp = floor(temp) * SHIFT_RIGHT8;\n\
outlineColor.g = (temp - floor(temp)) * SHIFT_LEFT8;\n\
outlineColor.r = floor(temp);\n\
#endif\n\
temp = compressedAttribute0.w * SHIFT_RIGHT8;\n\
#ifdef RENDER_FOR_PICK\n\
pickColor.a = (temp - floor(temp)) * SHIFT_LEFT8;\n\
pickColor = pickColor / 255.0;\n\
#endif\n\
temp = floor(temp) * SHIFT_RIGHT8;\n\
outlineColor.a = (temp - floor(temp)) * SHIFT_LEFT8;\n\
outlineColor /= 255.0;\n\
color.a = floor(temp);\n\
color /= 255.0;\n\
vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);\n\
vec4 positionEC = czm_modelViewRelativeToEye * p;\n\
positionEC.xyz *= show;\n\
#if defined(EYE_DISTANCE_SCALING) || defined(EYE_DISTANCE_TRANSLUCENCY)\n\
float lengthSq;\n\
if (czm_sceneMode == czm_sceneMode2D)\n\
{\n\
lengthSq = czm_eyeHeight2D.y;\n\
}\n\
else\n\
{\n\
lengthSq = dot(positionEC.xyz, positionEC.xyz);\n\
}\n\
#endif\n\
#ifdef EYE_DISTANCE_SCALING\n\
totalSize *= czm_nearFarScalar(scaleByDistance, lengthSq);\n\
#endif\n\
totalSize = min(totalSize, u_maxTotalPointSize);\n\
if (totalSize < 1.0)\n\
{\n\
positionEC.xyz = vec3(0.0);\n\
totalSize = 1.0;\n\
}\n\
float translucency = 1.0;\n\
#ifdef EYE_DISTANCE_TRANSLUCENCY\n\
translucency = czm_nearFarScalar(translucencyByDistance, lengthSq);\n\
if (translucency < 0.004)\n\
{\n\
positionEC.xyz = vec3(0.0);\n\
}\n\
#endif\n\
vec4 positionWC = czm_eyeToWindowCoordinates(positionEC);\n\
gl_Position = czm_viewportOrthographic * vec4(positionWC.xy, -positionWC.z, 1.0);\n\
v_color = color;\n\
v_color.a *= translucency;\n\
v_outlineColor = outlineColor;\n\
v_outlineColor.a *= translucency;\n\
v_innerPercent = 1.0 - outlinePercent;\n\
v_pixelDistance = 2.0 / totalSize;\n\
gl_PointSize = totalSize;\n\
#ifdef RENDER_FOR_PICK\n\
v_pickColor = pickColor;\n\
#endif\n\
}\n\
";
});