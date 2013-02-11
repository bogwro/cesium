// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "uniform sampler2D u_texture;\n\
uniform float u_northLatitude;\n\
uniform float u_southLatitude;\n\
uniform float u_southMercatorYHigh;\n\
uniform float u_southMercatorYLow;\n\
uniform float u_oneOverMercatorHeight;\n\
varying vec2 v_textureCoordinates;\n\
void main()\n\
{\n\
vec2 geographicUV = clamp(v_textureCoordinates, 0.0, 1.0);\n\
vec2 webMercatorUV = geographicUV;\n\
float currentLatitude = mix(u_southLatitude, u_northLatitude, geographicUV.y);\n\
float fraction = czm_latitudeToWebMercatorFraction(currentLatitude, u_southMercatorYLow, u_southMercatorYHigh, u_oneOverMercatorHeight);\n\
webMercatorUV = vec2(geographicUV.x, fraction);\n\
gl_FragColor = texture2D(u_texture, webMercatorUV);\n\
}\n\
";
});