//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "uniform vec4 u_intersectionColor;\n\
\n\
bool inSensorShadow(vec3 coneVertexWC, czm_ellipsoid ellipsoidEC, vec3 pointEC)\n\
{\n\
    // Diagonal matrix from the unscaled ellipsoid space to the scaled space.    \n\
    vec3 D = ellipsoidEC.inverseRadii;\n\
\n\
    // Sensor vertex in the scaled ellipsoid space\n\
    vec3 q = D * coneVertexWC;\n\
    float qMagnitudeSquared = dot(q, q);\n\
    float test = qMagnitudeSquared - 1.0;\n\
    \n\
    // Fragment in the ellipsoid frame\n\
    vec3 t = (czm_inverseView * vec4(pointEC, 1.0)).xyz;\n\
\n\
    // Sensor vertex to fragment vector in the ellipsoid's scaled space\n\
    vec3 temp = D * t - q;\n\
    float d = dot(temp, q);\n\
    \n\
    // Behind silhouette plane and inside silhouette cone\n\
    return (d < -test) && (d / length(temp) < -sqrt(test));\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
#ifndef RENDER_FOR_PICK\n\
\n\
vec4 getIntersectionColor(float sensorRadius, vec3 pointEC)\n\
{\n\
    return u_intersectionColor;\n\
}\n\
\n\
vec2 sensor2dTextureCoordinates(float sensorRadius, vec3 pointMC)\n\
{\n\
    // (s, t) both in the range [0, 1]\n\
    float t = pointMC.z / sensorRadius;\n\
    float s = 1.0 + (atan(pointMC.y, pointMC.x) / czm_twoPi);\n\
    s = s - floor(s);\n\
    \n\
    return vec2(s, t);\n\
}\n\
\n\
#endif";
});