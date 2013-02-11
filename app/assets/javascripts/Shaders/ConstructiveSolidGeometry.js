// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "float _czm_addWithCancellationCheck(float left, float right, float tolerance)\n\
{\n\
float difference = left + right;\n\
if ((sign(left) != sign(right)) && abs(difference / max(abs(left), abs(right))) < tolerance)\n\
{\n\
return 0.0;\n\
}\n\
else\n\
{\n\
return difference;\n\
}\n\
}\n\
struct czm_quadraticRoots\n\
{\n\
int numberOfRoots;\n\
float root0;\n\
float root1;\n\
};\n\
czm_quadraticRoots czm_quadraticRealPolynomialRealRoots(float a, float b, float c)\n\
{\n\
const float tolerance = czm_epsilon7;\n\
if (a == 0.0)\n\
{\n\
if (b == 0.0)\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
return r;\n\
}\n\
else\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(1, -c / b, 0.0);\n\
return r;\n\
}\n\
}\n\
else if (b == 0.0)\n\
{\n\
if (c == 0.0)\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(2, 0.0, 0.0);\n\
return r;\n\
}\n\
else\n\
{\n\
float cMagnitude = abs(c);\n\
float aMagnitude = abs(a);\n\
if ((cMagnitude < aMagnitude) && (cMagnitude / aMagnitude < tolerance))\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(2, 0.0, 0.0);\n\
return r;\n\
}\n\
else if ((cMagnitude > aMagnitude) && (aMagnitude / cMagnitude < tolerance))\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
return r;\n\
}\n\
else\n\
{\n\
float ratio = -c / a;\n\
if (ratio < 0.0)\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
return r;\n\
}\n\
else\n\
{\n\
float root = sqrt(ratio);\n\
czm_quadraticRoots r = czm_quadraticRoots(2, -root, root);\n\
return r;\n\
}\n\
}\n\
}\n\
}\n\
else if (c == 0.0)\n\
{\n\
float ratio = -b / a;\n\
if (ratio < 0.0)\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(2, ratio, 0.0);\n\
return r;\n\
}\n\
else\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(2, 0.0, ratio);\n\
return r;\n\
}\n\
}\n\
else\n\
{\n\
float b2 = b * b;\n\
float four_ac = 4.0 * a * c;\n\
float radicand = _czm_addWithCancellationCheck(b2, -four_ac, tolerance);\n\
if (radicand < 0.0)\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
return r;\n\
}\n\
else\n\
{\n\
float q = -0.5 * _czm_addWithCancellationCheck(b, sign(b) * sqrt(radicand), tolerance);\n\
if (b > 0.0)\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(2, q / a, c / q);\n\
return r;\n\
}\n\
else\n\
{\n\
czm_quadraticRoots r = czm_quadraticRoots(2, c / q, q / a);\n\
return r;\n\
}\n\
}\n\
}\n\
}\n\
struct czm_sphere\n\
{\n\
vec3 center;\n\
float radius;\n\
};\n\
czm_raySegment czm_raySphereIntersectionInterval(czm_ray ray, czm_sphere sphere)\n\
{\n\
vec3 l = sphere.center - ray.origin;\n\
float s = dot(l, ray.direction);\n\
float l2 = dot(l, l);\n\
float r2 = sphere.radius * sphere.radius;\n\
if ((s < 0.0)\n\
&& (l2 > r2))\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
float s2 = s * s;\n\
float m2 = l2 - s2;\n\
if (m2 > r2)\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
float q = sqrt(r2 - m2);\n\
if (czm_equalsEpsilon(q, 0.0))\n\
{\n\
return czm_raySegment(s, s);\n\
}\n\
if (l2 > r2)\n\
{\n\
czm_raySegment i = czm_raySegment(s - q, s + q);\n\
return i;\n\
}\n\
else if (l2 < r2)\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, s + q);\n\
return i;\n\
}\n\
else if (s > 0.0)\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, s + q);\n\
return i;\n\
}\n\
else\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
}\n\
vec3 czm_sphereNormal(czm_sphere sphere, vec3 pointOnSphere)\n\
{\n\
return normalize(pointOnSphere - sphere.center);\n\
}\n\
struct czm_cone\n\
{\n\
vec3 vertex;\n\
vec3 axis;\n\
float halfAperture;\n\
float cosineOfHalfAperture;\n\
float cosineSquaredOfHalfAperture;\n\
float sineOfHalfAperture;\n\
float sineSquaredOfHalfAperture;\n\
mat3 intersectionMatrix;\n\
};\n\
czm_cone czm_coneNew(vec3 vertex, vec3 axis, float halfAperture)\n\
{\n\
float cosineOfHalfAperture = cos(halfAperture);\n\
float cosineSquaredOfHalfAperture = cosineOfHalfAperture * cosineOfHalfAperture;\n\
float sineOfHalfAperture = sin(halfAperture);\n\
float sineSquaredOfHalfAperture = sineOfHalfAperture * sineOfHalfAperture;\n\
float x2 = axis.x * axis.x;\n\
float y2 = axis.y * axis.y;\n\
float z2 = axis.z * axis.z;\n\
float xy = axis.x * axis.y;\n\
float yz = axis.y * axis.z;\n\
float zx = axis.z * axis.x;\n\
mat3 intersectionMatrix = mat3(\n\
cosineSquaredOfHalfAperture - x2, -xy,                              -zx,\n\
-xy,                              cosineSquaredOfHalfAperture - y2, -yz,\n\
-zx,                              -yz,                              cosineSquaredOfHalfAperture - z2);\n\
czm_cone temp = czm_cone(vertex, axis, halfAperture,\n\
cosineOfHalfAperture, cosineSquaredOfHalfAperture,\n\
sineOfHalfAperture, sineSquaredOfHalfAperture, intersectionMatrix);\n\
return temp;\n\
}\n\
bool czm_coneContainsPoint(czm_cone cone, vec3 point)\n\
{\n\
vec3 n = normalize(point - cone.vertex);\n\
return (dot(n, cone.axis) >= cone.cosineOfHalfAperture);\n\
}\n\
bool _czm_rayIntersectsReflectedCone(czm_ray ray, czm_cone cone, float time, float cosine)\n\
{\n\
vec3 s = ray.origin + (time * ray.direction) - cone.vertex;\n\
vec3 sUnit = normalize(s);\n\
float c = dot(sUnit, cone.axis);\n\
return (sign(c) != sign(cosine));\n\
}\n\
czm_raySegmentCollection czm_rayConeIntersectionInterval(czm_ray ray, czm_cone cone)\n\
{\n\
vec3 temp = ray.origin - cone.vertex;\n\
float t2 = dot(temp, temp);\n\
float cosineNu = dot(ray.direction, cone.axis);\n\
if (t2 == 0.0)\n\
{\n\
if (cosineNu >= cone.cosineOfHalfAperture)\n\
{\n\
return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew();\n\
}\n\
}\n\
else\n\
{\n\
float projection = dot(normalize(temp), cone.axis);\n\
if (projection == cone.cosineOfHalfAperture)\n\
{\n\
vec3 u = ray.direction;\n\
mat3 crossProductMatrix = mat3(0.0, -u.z, u.y,\n\
u.z, 0.0, -u.x,\n\
-u.y, u.x, 0.0);\n\
if (length(crossProductMatrix * temp) == 0.0)\n\
{\n\
if (dot(temp, u) > 0.0)\n\
{\n\
return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
else\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, length(temp));\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew();\n\
}\n\
}\n\
else\n\
{\n\
vec3 t = normalize(temp);\n\
float cosineAlpha2 = cone.cosineOfHalfAperture * cone.cosineOfHalfAperture;\n\
float cosineTau = dot(t, cone.axis);\n\
float cosineDelta = dot(t, ray.direction);\n\
float cosineNu2 = cosineNu * cosineNu;\n\
float cosineTau2 = cosineTau * cosineTau;\n\
float stuff = cosineTau * cosineNu;\n\
float positiveTerm = cosineNu2 + cosineTau2;\n\
float negativeTerm = (cosineDelta * cosineDelta - 1.0) * cosineAlpha2;\n\
float signedTerm = -2.0 * stuff * cosineDelta;\n\
if (signedTerm > 0.0)\n\
{\n\
positiveTerm = positiveTerm + signedTerm;\n\
}\n\
else if (signedTerm < 0.0)\n\
{\n\
negativeTerm = negativeTerm + signedTerm;\n\
}\n\
float d = 4.0 * cosineAlpha2 * (positiveTerm + negativeTerm);\n\
if (d < 0.0)\n\
{\n\
if (cone.cosineOfHalfAperture < 0.0)\n\
{\n\
return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew();\n\
}\n\
}\n\
else if (d > 0.0)\n\
{\n\
float a = cosineNu2 - cosineAlpha2;\n\
float c = cosineTau2 - cosineAlpha2;\n\
float b = 2.0 * (stuff - cosineDelta * cosineAlpha2);\n\
float s = (b == 0.0) ? 1.0 : sign(b);\n\
float q = -(b + s * sqrt(d)) / 2.0;\n\
float first = q / a;\n\
float second = c / q;\n\
if (second < first)\n\
{\n\
float thing = first;\n\
first = second;\n\
second = thing;\n\
}\n\
bool firstTest = (first >= 0.0) && !(sign(dot(t + first * ray.direction, cone.axis)) == -sign(cone.cosineOfHalfAperture));\n\
bool secondTest = (second >= 0.0) && !(sign(dot(t + second * ray.direction, cone.axis)) == -sign(cone.cosineOfHalfAperture));\n\
float m = sqrt(t2);\n\
if (cosineTau > cone.cosineOfHalfAperture)\n\
{\n\
if (firstTest && secondTest)\n\
{\n\
czm_raySegment one = czm_raySegment(0.0, m * first);\n\
czm_raySegment two = czm_raySegment(m * second, czm_infinity);\n\
return czm_raySegmentCollectionNew(one, two);\n\
}\n\
else if (firstTest)\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, m * first);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else if (secondTest)\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, m * second);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
}\n\
else\n\
{\n\
if (firstTest && secondTest)\n\
{\n\
czm_raySegment i = czm_raySegment(m * first, m * second);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else if (firstTest)\n\
{\n\
czm_raySegment i = czm_raySegment(m * first, czm_infinity);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else if (secondTest)\n\
{\n\
czm_raySegment i = czm_raySegment(m * second, czm_infinity);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew();\n\
}\n\
}\n\
}\n\
else\n\
{\n\
if (cone.cosineOfHalfAperture == 0.0)\n\
{\n\
if (cosineTau >= 0.0)\n\
{\n\
if (cosineNu >= 0.0)\n\
{\n\
return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
else\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, -sqrt(t2) * cosineTau / cosineNu);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
}\n\
else\n\
{\n\
if (cosineNu <= 0.0)\n\
{\n\
return czm_raySegmentCollectionNew();\n\
}\n\
else\n\
{\n\
czm_raySegment i = czm_raySegment(-sqrt(t2) * cosineTau / cosineNu, czm_infinity);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
}\n\
}\n\
else\n\
{\n\
float a = cosineNu2 - cosineAlpha2;\n\
float c = cosineTau2 - cosineAlpha2;\n\
float b = 2.0 * (stuff - cosineDelta * cosineAlpha2);\n\
float root = (a == 0.0) ? -sign(b) * czm_infinity : (-sign(b) / sign(a)) * sqrt(c / a);\n\
bool rootTest = (root >= 0.0) && !(sign(dot(t + root * ray.direction, cone.axis)) == -sign(cone.cosineOfHalfAperture));\n\
float m = sqrt(t2);\n\
if (cosineTau > cone.cosineOfHalfAperture)\n\
{\n\
if (rootTest)\n\
{\n\
czm_raySegment i = czm_raySegment(0.0, m * root);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
}\n\
else\n\
{\n\
if (rootTest)\n\
{\n\
if (c < 0.0)\n\
{\n\
float thing = m * root;\n\
czm_raySegment i = czm_raySegment(thing, thing);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
else\n\
{\n\
float thing = m * root;\n\
czm_raySegment i = czm_raySegment(thing, czm_infinity);\n\
return czm_raySegmentCollectionNew(i);\n\
}\n\
}\n\
else\n\
{\n\
return czm_raySegmentCollectionNew();\n\
}\n\
}\n\
}\n\
}\n\
}\n\
}\n\
}\n\
vec3 czm_coneNormal(czm_cone cone, vec3 pointOnCone)\n\
{\n\
vec3 s = pointOnCone - cone.vertex;\n\
vec3 sUnit = normalize(s);\n\
return normalize((cone.cosineOfHalfAperture * sUnit - cone.axis) / cone.sineOfHalfAperture);\n\
}\n\
struct czm_ellipsoidSilhouetteCone\n\
{\n\
czm_ellipsoid ellipsoid;\n\
vec3 pointOutsideEllipsoid;\n\
czm_cone coneInScaledSpace;\n\
};\n\
vec3 czm_ellipsoidSilhouetteConeNormal(czm_ellipsoidSilhouetteCone cone, vec3 pointOnCone)\n\
{\n\
vec3 pointOnScaledCone = cone.ellipsoid.inverseRadii * (czm_inverseView * vec4(pointOnCone, 1.0)).xyz;\n\
vec3 scaledNormal = czm_coneNormal(cone.coneInScaledSpace, pointOnScaledCone);\n\
vec3 temp = -normalize(czm_viewRotation * (cone.ellipsoid.radii * scaledNormal));\n\
return temp;\n\
}\n\
czm_ellipsoidSilhouetteCone czm_ellipsoidSilhouetteConeNew(czm_ellipsoid ellipsoid, vec3 pointOutsideEllipsoid)\n\
{\n\
vec3 q = ellipsoid.inverseRadii * (czm_inverseView * vec4(pointOutsideEllipsoid, 1.0)).xyz;\n\
vec3 axis = -normalize(q);\n\
float q2 = dot(q, q);\n\
float sineSquaredOfHalfAperture = 1.0 / q2;\n\
float sineOfHalfAperture = sqrt(sineSquaredOfHalfAperture);\n\
float cosineSquaredOfHalfAperture = 1.0 - sineSquaredOfHalfAperture;\n\
float cosineOfHalfAperture = sqrt(cosineSquaredOfHalfAperture);\n\
float halfAperture = atan(sineOfHalfAperture / cosineOfHalfAperture);\n\
float x2 = axis.x * axis.x;\n\
float y2 = axis.y * axis.y;\n\
float z2 = axis.z * axis.z;\n\
float xy = axis.x * axis.y;\n\
float yz = axis.y * axis.z;\n\
float zx = axis.z * axis.x;\n\
mat3 intersectionMatrix = mat3(\n\
cosineSquaredOfHalfAperture - x2, -xy,                              -zx,\n\
-xy,                              cosineSquaredOfHalfAperture - y2, -yz,\n\
-zx,                              -yz,                              cosineSquaredOfHalfAperture - z2);\n\
czm_cone coneInScaledSpace = czm_cone(q, axis, halfAperture,\n\
cosineOfHalfAperture, cosineSquaredOfHalfAperture,\n\
sineOfHalfAperture, sineSquaredOfHalfAperture, intersectionMatrix);\n\
czm_ellipsoidSilhouetteCone temp = czm_ellipsoidSilhouetteCone(ellipsoid, pointOutsideEllipsoid, coneInScaledSpace);\n\
return temp;\n\
}\n\
czm_raySegment czm_rayEllipsoidSilhouetteConeIntersectionInterval(czm_ray ray, czm_ellipsoidSilhouetteCone cone)\n\
{\n\
vec3 origin = cone.ellipsoid.inverseRadii * (czm_inverseView * vec4(ray.origin, 1.0)).xyz;\n\
vec3 direction = normalize(cone.ellipsoid.inverseRadii * (czm_inverseViewRotation * ray.direction));\n\
czm_ray rayInScaledSpace = czm_ray(origin, direction);\n\
czm_raySegmentCollection collection = czm_rayConeIntersectionInterval(rayInScaledSpace, cone.coneInScaledSpace);\n\
if (collection.count == 0)\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
else\n\
{\n\
czm_raySegment interval = collection.intervals[0];\n\
float start = interval.start;\n\
if (start != 0.0)\n\
{\n\
vec3 temp = (czm_view * vec4(cone.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, start), 1.0)).xyz;\n\
start = dot(temp, ray.direction);\n\
}\n\
float stop = interval.stop;\n\
if (stop != czm_infinity)\n\
{\n\
vec3 temp = (czm_view * vec4(cone.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, stop), 1.0)).xyz;\n\
stop = dot(temp, ray.direction);\n\
}\n\
return czm_raySegment(start, stop);\n\
}\n\
}\n\
struct czm_halfspace\n\
{\n\
vec3 center;\n\
vec3 normal;\n\
};\n\
czm_raySegment czm_rayHalfspaceIntersectionInterval(czm_ray ray, czm_halfspace halfspace)\n\
{\n\
float numerator = dot(halfspace.center - ray.origin, halfspace.normal);\n\
float denominator = dot(ray.direction, halfspace.normal);\n\
if (numerator > 0.0)\n\
{\n\
if (denominator > 0.0)\n\
{\n\
return czm_raySegment(0.0, numerator / denominator);\n\
}\n\
else\n\
{\n\
return czm_fullRaySegment;\n\
}\n\
}\n\
else if (numerator < 0.0)\n\
{\n\
if (denominator < 0.0 )\n\
{\n\
return czm_raySegment(numerator / denominator, czm_infinity);\n\
}\n\
else\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
}\n\
else\n\
{\n\
if (denominator < 0.0 )\n\
{\n\
return czm_fullRaySegment;\n\
}\n\
else\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
}\n\
}\n\
struct czm_ellipsoidSilhouetteHalfspace\n\
{\n\
czm_ellipsoid ellipsoid;\n\
vec3 pointOutsideEllipsoid;\n\
czm_halfspace halfspaceInScaledSpace;\n\
};\n\
czm_ellipsoidSilhouetteHalfspace czm_ellipsoidSilhouetteHalfspaceNew(czm_ellipsoid ellipsoid, vec3 pointOutsideEllipsoid)\n\
{\n\
vec3 q = ellipsoid.inverseRadii * (czm_inverseView * vec4(pointOutsideEllipsoid, 1.0)).xyz;\n\
float magnitude = 1.0 / length(q);\n\
vec3 normal = normalize(q);\n\
vec3 center = magnitude * normal;\n\
czm_halfspace halfspaceInScaledSpace = czm_halfspace(center, normal);\n\
czm_ellipsoidSilhouetteHalfspace temp = czm_ellipsoidSilhouetteHalfspace(ellipsoid, pointOutsideEllipsoid, halfspaceInScaledSpace);\n\
return temp;\n\
}\n\
czm_raySegment czm_rayEllipsoidSilhouetteHalfspaceIntersectionInterval(czm_ray ray, czm_ellipsoidSilhouetteHalfspace halfspace)\n\
{\n\
vec3 origin = halfspace.ellipsoid.inverseRadii * (czm_inverseView * vec4(ray.origin, 1.0)).xyz;\n\
vec3 direction = halfspace.ellipsoid.inverseRadii * (czm_inverseViewRotation * ray.direction);\n\
czm_ray rayInScaledSpace = czm_ray(origin, direction);\n\
czm_raySegment interval = czm_rayHalfspaceIntersectionInterval(rayInScaledSpace, halfspace.halfspaceInScaledSpace);\n\
if (czm_isEmpty(interval))\n\
{\n\
return interval;\n\
}\n\
else\n\
{\n\
float start = interval.start;\n\
if (start != 0.0)\n\
{\n\
vec3 temp = (czm_view * vec4(halfspace.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, start), 1.0)).xyz;\n\
start = dot(temp, ray.direction);\n\
}\n\
float stop = interval.stop;\n\
if (stop != czm_infinity)\n\
{\n\
vec3 temp = (czm_view * vec4(halfspace.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, stop), 1.0)).xyz;\n\
stop = dot(temp, ray.direction);\n\
}\n\
return czm_raySegment(start, stop);\n\
}\n\
}\n\
";
});