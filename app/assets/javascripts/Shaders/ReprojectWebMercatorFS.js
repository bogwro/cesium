//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "uniform sampler2D u_texture;\n\
\n\
uniform float u_northLatitude;\n\
uniform float u_southLatitude;\n\
uniform float u_southMercatorYHigh;\n\
uniform float u_southMercatorYLow;\n\
uniform float u_oneOverMercatorHeight;\n\
\n\
varying vec2 v_textureCoordinates;\n\
\n\
void main()\n\
{\n\
    // The clamp below works around an apparent bug in Chrome Canary v23.0.1241.0\n\
    // where the fragment shader sees textures coordinates < 0.0 and > 1.0 for the\n\
    // fragments on the edges of tiles even though the vertex shader is outputting\n\
    // coordinates strictly in the 0-1 range.\n\
    vec2 geographicUV = clamp(v_textureCoordinates, 0.0, 1.0);\n\
    vec2 webMercatorUV = geographicUV;\n\
    \n\
    float currentLatitude = mix(u_southLatitude, u_northLatitude, geographicUV.y);\n\
    float fraction = czm_latitudeToWebMercatorFraction(currentLatitude, u_southMercatorYLow, u_southMercatorYHigh, u_oneOverMercatorHeight);\n\
    \n\
    webMercatorUV = vec2(geographicUV.x, fraction);\n\
    \n\
    gl_FragColor = texture2D(u_texture, webMercatorUV);\n\
}\n\
";
});