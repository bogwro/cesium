//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "attribute vec3 positionHigh;\n\
attribute vec3 positionLow;\n\
attribute vec2 direction;\n\
attribute vec4 textureCoordinatesAndImageSize;\n\
attribute vec3 originAndShow;\n\
attribute vec2 pixelOffset;\n\
attribute vec4 eyeOffsetAndScale;\n\
#ifdef RENDER_FOR_PICK\n\
attribute vec4 pickColor;\n\
#else\n\
attribute vec4 color;\n\
#endif\n\
uniform vec2 u_atlasSize;\n\
const vec2 czm_highResolutionSnapScale = vec2(1.0, 1.0);\n\
varying vec2 v_textureCoordinates;\n\
#ifdef RENDER_FOR_PICK\n\
varying vec4 v_pickColor;\n\
#else\n\
varying vec4 v_color;\n\
#endif\n\
void main()\n\
{\n\
vec3 eyeOffset = eyeOffsetAndScale.xyz;\n\
float scale = eyeOffsetAndScale.w;\n\
vec2 textureCoordinates = textureCoordinatesAndImageSize.xy;\n\
vec2 imageSize = textureCoordinatesAndImageSize.zw;\n\
vec2 origin = originAndShow.xy;\n\
float show = originAndShow.z;\n\
vec4 p = vec4(czm_translateRelativeToEye(positionHigh, positionLow), 1.0);\n\
vec4 positionEC = czm_modelViewRelativeToEye * p;\n\
positionEC = czm_eyeOffset(positionEC, eyeOffset);\n\
positionEC.xyz *= show;\n\
vec4 positionWC = czm_eyeToWindowCoordinates(positionEC);\n\
vec2 halfSize = u_atlasSize * imageSize * 0.5 * scale * czm_highResolutionSnapScale;\n\
halfSize *= ((direction * 2.0) - 1.0);\n\
positionWC.xy += (origin * abs(halfSize)) + halfSize;\n\
positionWC.xy += (pixelOffset * czm_highResolutionSnapScale);\n\
gl_Position = czm_viewportOrthographic * vec4(positionWC.xy, -positionWC.z, 1.0);\n\
v_textureCoordinates = textureCoordinates;\n\
#ifdef RENDER_FOR_PICK\n\
v_pickColor = pickColor;\n\
#else\n\
v_color = color;\n\
#endif\n\
}\n\
";
});