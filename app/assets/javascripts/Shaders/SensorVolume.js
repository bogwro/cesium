//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "uniform vec4 u_intersectionColor;\n\
bool inSensorShadow(vec3 coneVertexWC, czm_ellipsoid ellipsoidEC, vec3 pointEC)\n\
{\n\
vec3 D = ellipsoidEC.inverseRadii;\n\
vec3 q = D * coneVertexWC;\n\
float qMagnitudeSquared = dot(q, q);\n\
float test = qMagnitudeSquared - 1.0;\n\
vec3 t = (czm_inverseView * vec4(pointEC, 1.0)).xyz;\n\
vec3 temp = D * t - q;\n\
float d = dot(temp, q);\n\
return (d < -test) && (d / length(temp) < -sqrt(test));\n\
}\n\
#ifndef RENDER_FOR_PICK\n\
vec4 getIntersectionColor(float sensorRadius, vec3 pointEC)\n\
{\n\
return u_intersectionColor;\n\
}\n\
vec2 sensor2dTextureCoordinates(float sensorRadius, vec3 pointMC)\n\
{\n\
float t = pointMC.z / sensorRadius;\n\
float s = 1.0 + (atan(pointMC.y, pointMC.x) / czm_twoPi);\n\
s = s - floor(s);\n\
return vec2(s, t);\n\
}\n\
#endif\n\
";
});