// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "uniform vec3 u_radii;\n\
uniform vec3 u_oneOverEllipsoidRadiiSquared;\n\
varying vec3 v_positionEC;\n\
void main()\n\
{\n\
czm_ellipsoid ellipsoid = czm_ellipsoidNew(czm_modelView[3].xyz, u_radii);\n\
vec3 direction = normalize(v_positionEC);\n\
czm_ray ray = czm_ray(vec3(0.0), direction);\n\
czm_raySegment intersection = czm_rayEllipsoidIntersectionInterval(ray, ellipsoid);\n\
if (czm_isEmpty(intersection))\n\
{\n\
discard;\n\
}\n\
bool hitFrontFace = (intersection.start != 0.0);\n\
vec3 positionEC = czm_pointAlongRay(ray, hitFrontFace ? intersection.start : intersection.stop);\n\
vec3 positionMC = (czm_inverseModelView * vec4(positionEC, 1.0)).xyz;\n\
vec3 geodeticNormal = normalize(czm_geodeticSurfaceNormal(positionMC, vec3(0.0), u_oneOverEllipsoidRadiiSquared));\n\
vec3 normalMC = hitFrontFace ? geodeticNormal : -geodeticNormal;\n\
vec3 normalEC = normalize(czm_normal * normalMC);\n\
vec2 st = czm_ellipsoidWgs84TextureCoordinates(geodeticNormal);\n\
vec3 positionToEyeEC = -positionEC;\n\
czm_materialInput materialInput;\n\
materialInput.s = st.s;\n\
materialInput.st = st;\n\
materialInput.str = (positionMC + u_radii) / u_radii;\n\
materialInput.normalEC = normalEC;\n\
materialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(positionMC, normalEC);\n\
materialInput.positionToEyeEC = positionToEyeEC;\n\
materialInput.positionMC = positionMC;\n\
czm_material material = czm_getMaterial(materialInput);\n\
gl_FragColor = czm_phong(normalize(positionToEyeEC), material);\n\
}\n\
";
});