//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "#ifdef GL_OES_standard_derivatives\n\
#extension GL_OES_standard_derivatives : enable\n\
#endif\n\
uniform bool u_showIntersection;\n\
uniform bool u_showThroughEllipsoid;\n\
uniform float u_sensorRadius;\n\
varying vec3 v_positionWC;\n\
varying vec3 v_positionEC;\n\
varying vec3 v_normalEC;\n\
vec4 getColor(float sensorRadius, vec3 pointEC)\n\
{\n\
czm_materialInput materialInput;\n\
vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\n\
materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\n\
materialInput.str = pointMC / sensorRadius;\n\
vec3 positionToEyeEC = -v_positionEC;\n\
materialInput.positionToEyeEC = positionToEyeEC;\n\
vec3 normalEC = normalize(v_normalEC);\n\
normalEC = mix(normalEC, -normalEC, step(normalEC.z, 0.0));\n\
materialInput.normalEC = normalEC;\n\
czm_material material = czm_getMaterial(materialInput);\n\
return czm_phong(normalize(positionToEyeEC), material);\n\
}\n\
bool ellipsoidSensorIntersection(czm_raySegment ellipsoidInterval, float pointInEllipsoid)\n\
{\n\
if (czm_isEmpty(ellipsoidInterval)) {\n\
return false;\n\
}\n\
float t = pointInEllipsoid;\n\
#ifdef GL_OES_standard_derivatives\n\
float epsilon = max(abs(dFdx(t)), abs(dFdy(t)));\n\
#else\n\
float epsilon = 1.0 / 500.0;\n\
#endif\n\
float width = 2.0;\n\
epsilon *= width;\n\
return czm_equalsEpsilon(t, 1.0, epsilon);\n\
}\n\
vec4 shade(czm_raySegment ellipsoidInterval, float pointInEllipsoid)\n\
{\n\
if (u_showIntersection && ellipsoidSensorIntersection(ellipsoidInterval, pointInEllipsoid))\n\
{\n\
return getIntersectionColor(u_sensorRadius, v_positionEC);\n\
}\n\
return getColor(u_sensorRadius, v_positionEC);\n\
}\n\
float czm_pointInEllipsoid(czm_ellipsoid ellipsoid, vec3 point)\n\
{\n\
return (((point.x * point.x) / (ellipsoid.radii.x * ellipsoid.radii.x)) +\n\
((point.y * point.y) / (ellipsoid.radii.y * ellipsoid.radii.y)) +\n\
((point.z * point.z) / (ellipsoid.radii.z * ellipsoid.radii.z)));\n\
}\n\
void main()\n\
{\n\
vec3 sensorVertexWC = czm_model[3].xyz;\n\
vec3 sensorVertexEC = czm_modelView[3].xyz;\n\
czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\n\
float pointInEllipsoid = czm_pointInEllipsoid(ellipsoid, v_positionWC);\n\
if (!u_showThroughEllipsoid)\n\
{\n\
if (pointInEllipsoid < 1.0)\n\
{\n\
discard;\n\
}\n\
if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionEC))\n\
{\n\
discard;\n\
}\n\
}\n\
if (distance(v_positionEC, sensorVertexEC) > u_sensorRadius)\n\
{\n\
discard;\n\
}\n\
czm_ray ray = czm_ray(vec3(0.0), normalize(v_positionEC));\n\
czm_raySegment ellipsoidInterval = czm_rayEllipsoidIntersectionInterval(ray, ellipsoid);\n\
gl_FragColor = shade(ellipsoidInterval, pointInEllipsoid);\n\
}\n\
";
});