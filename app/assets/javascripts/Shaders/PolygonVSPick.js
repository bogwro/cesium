// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "attribute vec3 position3DHigh;\n\
attribute vec3 position3DLow;\n\
attribute vec2 position2DHigh;\n\
attribute vec2 position2DLow;\n\
uniform float u_morphTime;\n\
uniform float u_height;\n\
void main()\n\
{\n\
vec4 p;\n\
if (u_morphTime == 1.0)\n\
{\n\
p = vec4(czm_translateRelativeToEye(position3DHigh, position3DLow), 1.0);\n\
}\n\
else if (u_morphTime == 0.0)\n\
{\n\
p = vec4(czm_translateRelativeToEye(vec3(u_height, position2DHigh), vec3(u_height, position2DLow)), 1.0);\n\
}\n\
else\n\
{\n\
p = czm_columbusViewMorph(\n\
czm_translateRelativeToEye(vec3(u_height, position2DHigh), vec3(u_height, position2DLow)),\n\
czm_translateRelativeToEye(position3DHigh, position3DLow),\n\
u_morphTime);\n\
}\n\
gl_Position = czm_modelViewProjectionRelativeToEye * p;\n\
}\n\
";
});