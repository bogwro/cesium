// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "#ifdef GL_OES_standard_derivatives\n\
#extension GL_OES_standard_derivatives : enable\n\
#endif\n\
uniform float u_sensorRadius;\n\
uniform float u_outerHalfAngle;\n\
uniform float u_innerHalfAngle;\n\
uniform float u_maximumClockAngle;\n\
uniform float u_minimumClockAngle;\n\
uniform bool u_showIntersection;\n\
uniform vec4 u_pickColor;\n\
varying vec3 v_positionEC;\n\
varying vec3 v_sensorVertexWC;\n\
varying vec3 v_sensorVertexEC;\n\
varying vec3 v_sensorAxisEC;\n\
#ifndef RENDER_FOR_PICK\n\
czm_materialInput getMaterialInput(float sensorRadius, vec3 pointEC, vec3 normalEC)\n\
{\n\
czm_materialInput materialInput;\n\
vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\n\
materialInput.positionToEyeEC = -v_positionEC;\n\
materialInput.normalEC = normalEC;\n\
materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\n\
materialInput.str = pointMC / sensorRadius;\n\
materialInput.positionMC = pointMC;\n\
return materialInput;\n\
}\n\
vec4 getOuterColor(float sensorRadius, vec3 pointEC, vec3 normalEC)\n\
{\n\
czm_materialInput materialInput = getMaterialInput(sensorRadius, pointEC, normalEC);\n\
czm_material material = czm_getOuterMaterial(materialInput);\n\
vec3 positionToEyeEC = normalize(-v_positionEC);\n\
return czm_phong(positionToEyeEC, material);\n\
}\n\
vec4 getInnerColor(float sensorRadius, vec3 pointEC, vec3 normalEC)\n\
{\n\
czm_materialInput materialInput = getMaterialInput(sensorRadius, pointEC, normalEC);\n\
czm_material material = czm_getInnerMaterial(materialInput);\n\
vec3 positionToEyeEC = normalize(-v_positionEC);\n\
return czm_phong(positionToEyeEC, material);\n\
}\n\
vec4 getCapColor(float sensorRadius, vec3 pointEC, vec3 normalEC)\n\
{\n\
czm_materialInput materialInput = getMaterialInput(sensorRadius, pointEC, normalEC);\n\
czm_material material = czm_getCapMaterial(materialInput);\n\
vec3 positionToEyeEC = normalize(-v_positionEC);\n\
return czm_phong(positionToEyeEC, material);\n\
}\n\
vec4 getSilhouetteColor(float sensorRadius, vec3 pointEC, vec3 normalEC)\n\
{\n\
czm_materialInput materialInput = getMaterialInput(sensorRadius, pointEC, normalEC);\n\
czm_material material = czm_getSilhouetteMaterial(materialInput);\n\
vec3 positionToEyeEC = normalize(-v_positionEC);\n\
return czm_phong(positionToEyeEC, material);\n\
}\n\
#endif\n\
bool czm_isOnOrNear(float d, czm_raySegment interval, float epsilon)\n\
{\n\
bool answer = (czm_equalsEpsilon(d, interval.start, epsilon) || czm_equalsEpsilon(d, interval.stop, epsilon));\n\
return answer;\n\
}\n\
bool czm_isOnOrNear(float d, czm_raySegmentCollection coneIntervals, float epsilon)\n\
{\n\
bool answer = (coneIntervals.count > 0 && (czm_isOnOrNear(d, coneIntervals.intervals[0], epsilon)))\n\
|| (coneIntervals.count > 1 && (czm_isOnOrNear(d, coneIntervals.intervals[1], epsilon)));\n\
return answer;\n\
}\n\
bool czm_isOnOrNearSensor(float d, czm_raySegmentCollection outerIntervals, czm_raySegmentCollection innerIntervals, float epsilon)\n\
{\n\
bool answer = czm_isOnOrNear(d, outerIntervals, epsilon) || czm_isOnOrNear(d, innerIntervals, epsilon);\n\
return answer;\n\
}\n\
bool ellipsoidSensorIntersection(czm_raySegment sphereInterval,\n\
czm_raySegmentCollection outerIntervals, czm_raySegmentCollection innerIntervals,\n\
czm_raySegmentCollection clockIntervals,\n\
czm_raySegment ellipsoidInterval, czm_raySegment silhouetteHalfspaceInterval, czm_raySegmentCollection solid)\n\
{\n\
if (czm_isEmpty(ellipsoidInterval))\n\
{\n\
return false;\n\
}\n\
float t = ellipsoidInterval.start;\n\
#ifdef GL_OES_standard_derivatives\n\
float epsilon = max(abs(dFdx(t)), abs(dFdy(t)));\n\
#else\n\
float epsilon = t / 500.0;\n\
#endif\n\
float width = 2.0;\n\
epsilon *= width;\n\
if (solid.count > 0)\n\
{\n\
float d = solid.intervals[0].start;\n\
if (d == ellipsoidInterval.start\n\
&& (czm_isOnOrNear(d, silhouetteHalfspaceInterval, epsilon)\n\
|| czm_isOnOrNear(d, sphereInterval, epsilon)\n\
|| czm_isOnOrNear(d, clockIntervals, epsilon)\n\
|| czm_isOnOrNearSensor(d, outerIntervals, innerIntervals, epsilon))) return true;\n\
d = solid.intervals[0].stop;\n\
if (d == ellipsoidInterval.start\n\
&& (czm_isOnOrNear(d, silhouetteHalfspaceInterval, epsilon)\n\
|| czm_isOnOrNear(d, sphereInterval, epsilon)\n\
|| czm_isOnOrNear(d, clockIntervals, epsilon)\n\
|| czm_isOnOrNearSensor(d, outerIntervals, innerIntervals, epsilon))) return true;\n\
if (solid.count > 1)\n\
{\n\
d = solid.intervals[1].start;\n\
if (d == ellipsoidInterval.start\n\
&& (czm_isOnOrNear(d, silhouetteHalfspaceInterval, epsilon)\n\
|| czm_isOnOrNear(d, sphereInterval, epsilon)\n\
|| czm_isOnOrNear(d, clockIntervals, epsilon)\n\
|| czm_isOnOrNearSensor(d, outerIntervals, innerIntervals, epsilon))) return true;\n\
d = solid.intervals[1].stop;\n\
if (d == ellipsoidInterval.start\n\
&& (czm_isOnOrNear(d, silhouetteHalfspaceInterval, epsilon)\n\
|| czm_isOnOrNear(d, sphereInterval, epsilon)\n\
|| czm_isOnOrNear(d, clockIntervals, epsilon)\n\
|| czm_isOnOrNearSensor(d, outerIntervals, innerIntervals, epsilon))) return true;\n\
}\n\
return false;\n\
}\n\
else\n\
{\n\
false;\n\
}\n\
}\n\
vec4 shade(\n\
czm_ray ray,\n\
float nearestRayTime,\n\
czm_sphere sphere,\n\
czm_cone outerCone,\n\
czm_cone innerCone,\n\
czm_halfspace maxClock,\n\
czm_halfspace minClock,\n\
czm_ellipsoidSilhouetteCone silhouetteCone,\n\
czm_ellipsoidSilhouetteHalfspace silhouetteHalfspace,\n\
czm_raySegment sphereInterval,\n\
czm_raySegmentCollection outerConeInterval,\n\
czm_raySegmentCollection innerConeInterval,\n\
czm_raySegment maxClockInterval,\n\
czm_raySegment minClockInterval,\n\
czm_raySegmentCollection clockIntervals,\n\
czm_raySegment silhouetteConeInterval,\n\
czm_raySegment silhouetteHalfspaceInterval,\n\
czm_raySegment ellipsoidInterval,\n\
czm_raySegmentCollection intervals)\n\
{\n\
#ifdef RENDER_FOR_PICK\n\
return u_pickColor;\n\
#else\n\
vec3 nearestPoint = czm_pointAlongRay(ray, nearestRayTime);\n\
if (u_showIntersection && ellipsoidSensorIntersection(sphereInterval,\n\
outerConeInterval, innerConeInterval, clockIntervals,\n\
ellipsoidInterval, silhouetteHalfspaceInterval, intervals))\n\
{\n\
return getIntersectionColor(u_sensorRadius, nearestPoint);\n\
}\n\
vec3 positionToEyeEC = -ray.direction;\n\
vec3 czm_sunDirectionEC = czm_sunDirectionEC;\n\
for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
{\n\
if (i < outerConeInterval.count &&\n\
((nearestRayTime == outerConeInterval.intervals[i].start) ||\n\
(nearestRayTime == outerConeInterval.intervals[i].stop)))\n\
{\n\
vec3 normal = czm_coneNormal(outerCone, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getOuterColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
}\n\
for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
{\n\
if (i < innerConeInterval.count &&\n\
((nearestRayTime == innerConeInterval.intervals[i].start) ||\n\
(nearestRayTime == innerConeInterval.intervals[i].stop)))\n\
{\n\
vec3 normal = -czm_coneNormal(innerCone, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getInnerColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
}\n\
if ((nearestRayTime == sphereInterval.start) ||\n\
(nearestRayTime == sphereInterval.stop))\n\
{\n\
vec3 normal = czm_sphereNormal(sphere, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getCapColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
if ((nearestRayTime == maxClockInterval.start) ||\n\
(nearestRayTime == maxClockInterval.stop))\n\
{\n\
vec3 normal = maxClock.normal;\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getOuterColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
if ((nearestRayTime == minClockInterval.start) ||\n\
(nearestRayTime == minClockInterval.stop))\n\
{\n\
vec3 normal = minClock.normal;\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getOuterColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
if ((nearestRayTime == silhouetteConeInterval.start) ||\n\
(nearestRayTime == silhouetteConeInterval.stop))\n\
{\n\
vec3 normal = czm_ellipsoidSilhouetteConeNormal(silhouetteCone, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getSilhouetteColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
return vec4(1.0, 0.0, 0.0, 1.0);\n\
#endif\n\
}\n\
vec4 shade(\n\
czm_ray ray,\n\
float nearestRayTime,\n\
czm_sphere sphere,\n\
czm_cone outerCone,\n\
czm_cone innerCone,\n\
czm_halfspace maxClock,\n\
czm_halfspace minClock,\n\
czm_raySegment sphereInterval,\n\
czm_raySegmentCollection outerConeInterval,\n\
czm_raySegmentCollection innerConeInterval,\n\
czm_raySegment maxClockInterval,\n\
czm_raySegment minClockInterval,\n\
czm_raySegmentCollection intervals)\n\
{\n\
#ifdef RENDER_FOR_PICK\n\
return u_pickColor;\n\
#else\n\
vec3 nearestPoint = czm_pointAlongRay(ray, nearestRayTime);\n\
vec3 positionToEyeEC = -ray.direction;\n\
for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
{\n\
if (i < outerConeInterval.count &&\n\
((nearestRayTime == outerConeInterval.intervals[i].start) ||\n\
(nearestRayTime == outerConeInterval.intervals[i].stop)))\n\
{\n\
vec3 normal = czm_coneNormal(outerCone, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getOuterColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
}\n\
for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
{\n\
if (i < innerConeInterval.count &&\n\
((nearestRayTime == innerConeInterval.intervals[i].start) ||\n\
(nearestRayTime == innerConeInterval.intervals[i].stop)))\n\
{\n\
vec3 normal = -czm_coneNormal(innerCone, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getInnerColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
}\n\
if ((nearestRayTime == sphereInterval.start) ||\n\
(nearestRayTime == sphereInterval.stop))\n\
{\n\
vec3 normal = czm_sphereNormal(sphere, nearestPoint);\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getCapColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
if ((nearestRayTime == maxClockInterval.start) ||\n\
(nearestRayTime == maxClockInterval.stop))\n\
{\n\
vec3 normal = maxClock.normal;\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getOuterColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
if ((nearestRayTime == minClockInterval.start) ||\n\
(nearestRayTime == minClockInterval.stop))\n\
{\n\
vec3 normal = minClock.normal;\n\
normal = mix(normal, -normal, step(normal.z, 0.0));\n\
return getOuterColor(u_sensorRadius, nearestPoint, normal);\n\
}\n\
return vec4(1.0, 0.0, 0.0, 1.0);\n\
#endif\n\
}\n\
void main()\n\
{\n\
czm_ray ray = czm_ray(vec3(0.0), normalize(v_positionEC));\n\
czm_sphere sphere = czm_sphere(v_sensorVertexEC, u_sensorRadius);\n\
czm_raySegment sphereInterval = czm_raySphereIntersectionInterval(ray, sphere);\n\
if (czm_isEmpty(sphereInterval))\n\
{\n\
discard;\n\
}\n\
vec3 coneAxisEC = normalize(v_sensorAxisEC);\n\
czm_cone outerCone = czm_coneNew(v_sensorVertexEC, coneAxisEC, u_outerHalfAngle);\n\
czm_raySegmentCollection outerConeInterval = czm_rayConeIntersectionInterval(ray, outerCone);\n\
if (outerConeInterval.count == 0)\n\
{\n\
discard;\n\
}\n\
czm_cone innerCone = czm_coneNew(v_sensorVertexEC, coneAxisEC, u_innerHalfAngle);\n\
czm_raySegmentCollection innerConeInterval = czm_rayConeIntersectionInterval(ray, innerCone);\n\
czm_raySegmentCollection difference = (innerConeInterval.count == 0) ? outerConeInterval : czm_subtraction(outerConeInterval, innerConeInterval);\n\
if (difference.count == 0)\n\
{\n\
discard;\n\
}\n\
czm_raySegmentCollection capped = czm_intersection(difference, sphereInterval);\n\
if (capped.count == 0)\n\
{\n\
discard;\n\
}\n\
vec3 maxNormal = normalize((czm_modelView * vec4(-sin(u_maximumClockAngle), cos(u_maximumClockAngle), 0.0, 0.0)).xyz);\n\
czm_halfspace maxClock = czm_halfspace(v_sensorVertexEC, maxNormal);\n\
czm_raySegment maxClockInterval = czm_rayHalfspaceIntersectionInterval(ray, maxClock);\n\
vec3 minNormal = normalize((czm_modelView * vec4(sin(u_minimumClockAngle), -cos(u_minimumClockAngle), 0.0, 0.0)).xyz);\n\
czm_halfspace minClock = czm_halfspace(v_sensorVertexEC, minNormal);\n\
czm_raySegment minClockInterval = czm_rayHalfspaceIntersectionInterval(ray, minClock);\n\
czm_raySegmentCollection clockIntervals = ((u_maximumClockAngle - u_minimumClockAngle) > czm_pi)\n\
? (czm_isEmpty(maxClockInterval)\n\
? (czm_isEmpty(minClockInterval) ? czm_raySegmentCollectionNew() : czm_raySegmentCollectionNew(minClockInterval))\n\
: (czm_isEmpty(minClockInterval) ? czm_raySegmentCollectionNew(maxClockInterval) : czm_union(maxClockInterval, minClockInterval)))\n\
: ((czm_isEmpty(maxClockInterval) || czm_isEmpty(minClockInterval)) ? czm_raySegmentCollectionNew() : czm_raySegmentCollectionNew(czm_intersection(maxClockInterval, minClockInterval)));\n\
czm_raySegmentCollection sensor = (clockIntervals.count == 0) ? czm_raySegmentCollectionNew() : czm_intersection(capped, clockIntervals);\n\
if (sensor.count == 0)\n\
{\n\
discard;\n\
}\n\
czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\n\
czm_ellipsoidSilhouetteCone silhouetteCone = czm_ellipsoidSilhouetteConeNew(ellipsoid, v_sensorVertexEC);\n\
czm_raySegment silhouetteConeInterval = czm_rayEllipsoidSilhouetteConeIntersectionInterval(ray, silhouetteCone);\n\
if (czm_isEmpty(silhouetteConeInterval))\n\
{\n\
gl_FragColor = shade(ray, sensor.intervals[0].start,\n\
sphere, outerCone, innerCone, maxClock, minClock,\n\
sphereInterval, outerConeInterval, innerConeInterval, maxClockInterval, minClockInterval,\n\
sensor);\n\
}\n\
else\n\
{\n\
czm_ellipsoidSilhouetteHalfspace silhouetteHalfspace = czm_ellipsoidSilhouetteHalfspaceNew(ellipsoid, v_sensorVertexEC);\n\
czm_raySegment silhouetteHalfspaceInterval = czm_rayEllipsoidSilhouetteHalfspaceIntersectionInterval(ray, silhouetteHalfspace);\n\
czm_raySegment temp = (czm_isEmpty(silhouetteHalfspaceInterval)) ? czm_emptyRaySegment : czm_intersection(silhouetteConeInterval, silhouetteHalfspaceInterval);\n\
czm_raySegmentCollection stuff = (czm_isEmpty(temp)) ? sensor : czm_subtraction(sensor, temp);\n\
if (stuff.count == 0)\n\
{\n\
discard;\n\
}\n\
czm_raySegment ellipsoidInterval = czm_rayEllipsoidIntersectionInterval(ray, ellipsoid);\n\
czm_raySegmentCollection result = (czm_isEmpty(ellipsoidInterval)) ? stuff : czm_subtraction(stuff, ellipsoidInterval);\n\
if ((result.count == 0)\n\
|| (!czm_isEmpty(ellipsoidInterval) && (result.intervals[0].start > ellipsoidInterval.start)))\n\
{\n\
discard;\n\
}\n\
gl_FragColor = shade(ray, result.intervals[0].start,\n\
sphere, outerCone, innerCone, maxClock, minClock,\n\
silhouetteCone, silhouetteHalfspace,\n\
sphereInterval, outerConeInterval, innerConeInterval, maxClockInterval, minClockInterval, clockIntervals,\n\
silhouetteConeInterval, silhouetteHalfspaceInterval, ellipsoidInterval,\n\
result);\n\
}\n\
}\n\
";
});