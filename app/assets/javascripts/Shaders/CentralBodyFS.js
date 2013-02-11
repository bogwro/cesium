// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "#if TEXTURE_UNITS > 0\n\
uniform sampler2D u_dayTextures[TEXTURE_UNITS];\n\
uniform vec4 u_dayTextureTranslationAndScale[TEXTURE_UNITS];\n\
uniform float u_dayTextureAlpha[TEXTURE_UNITS];\n\
uniform float u_dayTextureBrightness[TEXTURE_UNITS];\n\
uniform float u_dayTextureContrast[TEXTURE_UNITS];\n\
uniform float u_dayTextureHue[TEXTURE_UNITS];\n\
uniform float u_dayTextureSaturation[TEXTURE_UNITS];\n\
uniform float u_dayTextureOneOverGamma[TEXTURE_UNITS];\n\
uniform vec4 u_dayTextureTexCoordsExtent[TEXTURE_UNITS];\n\
#endif\n\
varying vec3 v_positionMC;\n\
varying vec3 v_positionEC;\n\
varying vec2 v_textureCoordinates;\n\
vec3 sampleAndBlend(\n\
vec3 previousColor,\n\
sampler2D texture,\n\
vec2 tileTextureCoordinates,\n\
vec4 textureCoordinateExtent,\n\
vec4 textureCoordinateTranslationAndScale,\n\
float textureAlpha,\n\
float textureBrightness,\n\
float textureContrast,\n\
float textureHue,\n\
float textureSaturation,\n\
float textureOneOverGamma)\n\
{\n\
vec2 alphaMultiplier = step(textureCoordinateExtent.st, tileTextureCoordinates);\n\
textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\
alphaMultiplier = step(vec2(0.0), textureCoordinateExtent.pq - tileTextureCoordinates);\n\
textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\
vec2 translation = textureCoordinateTranslationAndScale.xy;\n\
vec2 scale = textureCoordinateTranslationAndScale.zw;\n\
vec2 textureCoordinates = tileTextureCoordinates * scale + translation;\n\
vec4 sample = texture2D(texture, textureCoordinates);\n\
vec3 color = sample.rgb;\n\
float alpha = sample.a;\n\
#ifdef APPLY_BRIGHTNESS\n\
color = mix(vec3(0.0, 0.0, 0.0), color, textureBrightness);\n\
#endif\n\
#ifdef APPLY_CONTRAST\n\
color = mix(vec3(0.5, 0.5, 0.5), color, textureContrast);\n\
#endif\n\
#ifdef APPLY_HUE\n\
color = czm_hue(color, textureHue);\n\
#endif\n\
#ifdef APPLY_SATURATION\n\
color = czm_saturation(color, textureSaturation);\n\
#endif\n\
#ifdef APPLY_GAMMA\n\
color = pow(color, vec3(textureOneOverGamma));\n\
#endif\n\
#ifdef SHOW_TEXTURE_BOUNDARIES\n\
if (textureCoordinates.x < (1.0/256.0) || textureCoordinates.x > (255.0/256.0) ||\n\
textureCoordinates.y < (1.0/256.0) || textureCoordinates.y > (255.0/256.0))\n\
{\n\
color = vec3(1.0, 1.0, 0.0);\n\
alpha = 1.0;\n\
}\n\
#endif\n\
return mix(previousColor, color, alpha * textureAlpha);\n\
}\n\
vec3 computeDayColor(vec3 initialColor, vec2 textureCoordinates);\n\
void main()\n\
{\n\
vec3 initialColor = vec3(0.0, 0.0, 0.5);\n\
vec3 startDayColor = computeDayColor(initialColor, clamp(v_textureCoordinates, 0.0, 1.0));\n\
#ifdef SHOW_TILE_BOUNDARIES\n\
if (v_textureCoordinates.x < (1.0/256.0) || v_textureCoordinates.x > (255.0/256.0) ||\n\
v_textureCoordinates.y < (1.0/256.0) || v_textureCoordinates.y > (255.0/256.0))\n\
{\n\
startDayColor = vec3(1.0, 0.0, 0.0);\n\
}\n\
#endif\n\
gl_FragColor = vec4(startDayColor, 1.0);\n\
}\n\
";
});