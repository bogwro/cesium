//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "#ifdef GL_OES_standard_derivatives\n\
    #extension GL_OES_standard_derivatives : enable\n\
#endif  \n\
\n\
uniform bool u_showIntersection;\n\
uniform bool u_showThroughEllipsoid;\n\
\n\
uniform float u_sensorRadius;\n\
uniform vec4 u_pickColor;\n\
\n\
varying vec3 v_positionWC;\n\
varying vec3 v_positionEC;\n\
varying vec3 v_normalEC;\n\
\n\
#ifndef RENDER_FOR_PICK\n\
\n\
vec4 getColor(float sensorRadius, vec3 pointEC)\n\
{\n\
    czm_materialInput materialInput;\n\
    \n\
    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;                                \n\
    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);   \n\
    materialInput.str = pointMC / sensorRadius;\n\
    materialInput.positionMC = pointMC;               \n\
    \n\
    vec3 positionToEyeEC = -v_positionEC;\n\
    materialInput.positionToEyeEC = positionToEyeEC;\n\
    \n\
    vec3 normalEC = normalize(v_normalEC);\n\
    normalEC = mix(normalEC, -normalEC, step(normalEC.z, 0.0));  // Normal facing viewer\n\
    materialInput.normalEC = normalEC;\n\
    \n\
    czm_material material = czm_getMaterial(materialInput);\n\
    return czm_phong(normalize(positionToEyeEC), material);\n\
}\n\
\n\
#endif\n\
\n\
bool ellipsoidSensorIntersection(czm_raySegment ellipsoidInterval)\n\
{\n\
	if (czm_isEmpty(ellipsoidInterval))\n\
	{\n\
	    return false;\n\
	}\n\
\n\
    float t = ellipsoidInterval.start;\n\
\n\
#ifdef GL_OES_standard_derivatives\n\
    // TODO: This seems to be too aggressive in some areas, and too conservative in others\n\
    float epsilon = max(abs(dFdx(t)), abs(dFdy(t)));\n\
    \n\
    if (epsilon >= ellipsoidInterval.start)\n\
    {\n\
        // If the fragment is on the silhouette of the ellipsoid, the adjacent fragment\n\
        // will not hit the ellipsoid (its ellipsoidInterval.start will be zero),\n\
        // so the derivative will be large, and we would get false positives.\n\
        return false;\n\
    }\n\
#else\n\
    // TODO:  Don't hardcode this.\n\
    float epsilon = t / 500.0;\n\
#endif\n\
\n\
    float width = 2.0;  // TODO: Expose as a uniform\n\
    epsilon *= width;           \n\
\n\
    return czm_equalsEpsilon(t, length(v_positionEC), epsilon);\n\
}\n\
\n\
vec4 shade(czm_raySegment ellipsoidInterval)\n\
{\n\
#ifdef RENDER_FOR_PICK\n\
    return u_pickColor;\n\
#else\n\
    if (u_showIntersection && ellipsoidSensorIntersection(ellipsoidInterval))\n\
    {\n\
        return getIntersectionColor(u_sensorRadius, v_positionEC);\n\
    }\n\
    return getColor(u_sensorRadius, v_positionEC);\n\
#endif\n\
}\n\
\n\
bool czm_pointInEllipsoid(czm_ellipsoid ellipsoid, vec3 point)\n\
{\n\
    // TODO: Take into account ellipsoid's center; optimize with radii-squared; and move elsewhere\n\
    return (((point.x * point.x) / (ellipsoid.radii.x * ellipsoid.radii.x)) +\n\
            ((point.y * point.y) / (ellipsoid.radii.y * ellipsoid.radii.y)) +\n\
            ((point.z * point.z) / (ellipsoid.radii.z * ellipsoid.radii.z)) < 1.0);\n\
}\n\
\n\
void main()\n\
{\n\
    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\n\
    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\n\
\n\
    czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\n\
\n\
    // Occluded by the ellipsoid?\n\
	if (!u_showThroughEllipsoid)\n\
	{\n\
	    // Discard if in the ellipsoid    \n\
	    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\n\
	    if (czm_pointInEllipsoid(ellipsoid, v_positionWC))\n\
	    {\n\
            discard;\n\
	    }\n\
\n\
	    // Discard if in the sensor's shadow\n\
	    if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionEC))\n\
	    {\n\
	        discard;\n\
	    }\n\
    }\n\
\n\
    // Discard if not in the sensor's sphere\n\
    // PERFORMANCE_IDEA: We can omit this check if the radius is Number.POSITIVE_INFINITY.\n\
    if (distance(v_positionEC, sensorVertexEC) > u_sensorRadius)\n\
    {\n\
        discard;\n\
    }\n\
\n\
    czm_ray ray = czm_ray(vec3(0.0), normalize(v_positionEC));  // Ray from eye to fragment in eye coordinates\n\
    czm_raySegment ellipsoidInterval = czm_rayEllipsoidIntersectionInterval(ray, ellipsoid);\n\
\n\
    gl_FragColor = shade(ellipsoidInterval);\n\
}\n\
";
});