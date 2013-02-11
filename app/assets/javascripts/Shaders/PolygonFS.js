// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "uniform float u_morphTime;\n\
varying vec3 v_positionMC;\n\
varying vec3 v_positionEC;\n\
varying vec2 v_textureCoordinates;\n\
void main()\n\
{\n\
czm_materialInput materialInput;\n\
materialInput.st = v_textureCoordinates;\n\
materialInput.str = vec3(v_textureCoordinates, 0.0);\n\
materialInput.positionMC = v_positionMC;\n\
materialInput.normalEC = mix(czm_normal[0], normalize(czm_normal * czm_geodeticSurfaceNormal(v_positionMC, vec3(0.0), vec3(1.0))), u_morphTime);\n\
materialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(v_positionMC, materialInput.normalEC);\n\
vec3 positionToEyeEC = -v_positionEC;\n\
materialInput.positionToEyeEC = positionToEyeEC;\n\
czm_material material = czm_getMaterial(materialInput);\n\
gl_FragColor = czm_phong(normalize(positionToEyeEC), material);\n\
}\n\
";
});