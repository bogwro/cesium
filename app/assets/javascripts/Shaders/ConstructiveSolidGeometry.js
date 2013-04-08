//This file is automatically rebuilt by the Cesium build process.
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
        \n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_quadraticRoots\n\
 * @glslStruct\n\
 */\n\
struct czm_quadraticRoots\n\
{\n\
    int numberOfRoots;\n\
    float root0;\n\
    float root1;\n\
};\n\
\n\
/**\n\
 * Computes the real-valued roots of the 2nd order polynomial function of one variable with only real coefficients.\n\
 *\n\
 * @name czm_quadraticRealPolynomialRealRoots\n\
 * @glslFunction\n\
 *\n\
 * @param {float} a The coefficient of the 2nd order monomial.\n\
 * @param {float} b The coefficient of the 1st order monomial.\n\
 * @param {float} c The coefficient of the 0th order monomial.\n\
 * \n\
 * @returns {czm_quadraticRoots} Zero, one, or two real-valued roots.\n\
 * \n\
 * @example\n\
 * czm_quadraticRoots r = czm_quadraticRealPolynomialRealRoots(2.0, -4.0, -6.0); // 2(x + 1)(x - 3)\n\
 * // The result is r.numberOfRoots = 2, r.root0 = -1.0, and r.root1 = 3.0.\n\
 */\n\
czm_quadraticRoots czm_quadraticRealPolynomialRealRoots(float a, float b, float c)\n\
{\n\
    // This function's return statements have an ANGLE workaround:  http://code.google.com/p/angleproject/issues/detail?id=185\n\
\n\
    const float tolerance = czm_epsilon7;\n\
\n\
    if (a == 0.0)\n\
    {\n\
        if (b == 0.0)\n\
        {\n\
            // Constant function: c = 0.  No real polynomial roots possible.\n\
            czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
            return r;\n\
        }\n\
        else\n\
        {\n\
            // Linear function: b * x + c = 0.\n\
            czm_quadraticRoots r = czm_quadraticRoots(1, -c / b, 0.0);\n\
            return r;           \n\
        }\n\
    }\n\
    else if (b == 0.0)\n\
    {\n\
        if (c == 0.0)\n\
        {\n\
            // 2nd order monomial: a * x^2 = 0.\n\
            czm_quadraticRoots r = czm_quadraticRoots(2, 0.0, 0.0);\n\
            return r;\n\
        }\n\
        else\n\
        {\n\
            float cMagnitude = abs(c);\n\
            float aMagnitude = abs(a);\n\
    \n\
            if ((cMagnitude < aMagnitude) && (cMagnitude / aMagnitude < tolerance)) // c ~= 0.0.\n\
            {\n\
                // 2nd order monomial: a * x^2 = 0.\n\
                czm_quadraticRoots r = czm_quadraticRoots(2, 0.0, 0.0);\n\
                return r;\n\
            }\n\
            else if ((cMagnitude > aMagnitude) && (aMagnitude / cMagnitude < tolerance)) // a ~= 0.0.\n\
            {\n\
                // Constant function: c = 0.\n\
                czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
                return r;\n\
            }\n\
            else\n\
            {\n\
                // a * x^2 + c = 0\n\
                float ratio = -c / a;\n\
    \n\
                if (ratio < 0.0)\n\
                {\n\
                    // Both roots are complex.\n\
                    czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
                    return r;\n\
                }\n\
                else\n\
                {\n\
                    // Both roots are real.\n\
                    float root = sqrt(ratio);\n\
    \n\
                    // Return them in ascending order.\n\
                    czm_quadraticRoots r = czm_quadraticRoots(2, -root, root);\n\
                    return r;\n\
                }\n\
            }\n\
        }\n\
    }\n\
    else if (c == 0.0)\n\
    {\n\
        // a * x^2 + b * x = 0\n\
        float ratio = -b / a;\n\
    \n\
        // Return them in ascending order.\n\
        if (ratio < 0.0)\n\
        {\n\
            czm_quadraticRoots r = czm_quadraticRoots(2, ratio, 0.0);\n\
            return r;           \n\
        }\n\
        else\n\
        {\n\
            czm_quadraticRoots r = czm_quadraticRoots(2, 0.0, ratio);\n\
            return r;\n\
        }\n\
    }\n\
    else\n\
    {\n\
        // a * x^2 + b * x + c = 0\n\
        float b2 = b * b;\n\
        float four_ac = 4.0 * a * c;\n\
        float radicand = _czm_addWithCancellationCheck(b2, -four_ac, tolerance);\n\
    \n\
        if (radicand < 0.0)\n\
        {\n\
            // Both roots are complex.\n\
            czm_quadraticRoots r = czm_quadraticRoots(0, 0.0, 0.0);\n\
            return r;\n\
        }\n\
        else\n\
        {\n\
            // Both roots are real.\n\
            float q = -0.5 * _czm_addWithCancellationCheck(b, sign(b) * sqrt(radicand), tolerance);\n\
    \n\
            // Return them in ascending order.\n\
            if (b > 0.0)\n\
            {\n\
                // q < 0.0\n\
                czm_quadraticRoots r = czm_quadraticRoots(2, q / a, c / q);\n\
                return r;               \n\
            }\n\
            else\n\
            {\n\
                // q > 0.0\n\
                czm_quadraticRoots r = czm_quadraticRoots(2, c / q, q / a);\n\
                return r;               \n\
            }\n\
        }\n\
    }\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_sphere\n\
 * @glslStruct\n\
 */\n\
struct czm_sphere\n\
{\n\
    vec3 center;\n\
    float radius;\n\
};\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_raySphereIntersectionInterval\n\
 * @glslFunction\n\
 *\n\
 * @see czm_sphereNormal\n\
 */\n\
czm_raySegment czm_raySphereIntersectionInterval(czm_ray ray, czm_sphere sphere)\n\
{\n\
    // From Real-Time Rendering, Section 16.6.2, Optimized Ray/Sphere Intersection Solution, Page 741\n\
    \n\
    // This function's return statements have an ANGLE workaround:  http://code.google.com/p/angleproject/issues/detail?id=185\n\
    \n\
    // PERFORMANCE_IDEA:  A more optimized but less friendly function could take radius squared directly, \n\
    // assume a center or origin of zero, etc.\n\
    \n\
    vec3 l = sphere.center - ray.origin;\n\
    float s = dot(l, ray.direction);\n\
    float l2 = dot(l, l);\n\
    float r2 = sphere.radius * sphere.radius;\n\
    \n\
    if ((s < 0.0) // Looking away from sphere.\n\
    && (l2 > r2)) // Outside of sphere.\n\
    {\n\
        return czm_emptyRaySegment;  // ray does not intersect (at least not along the indicated direction).\n\
    }\n\
    \n\
    float s2 = s * s;\n\
    float m2 = l2 - s2;\n\
    \n\
    if (m2 > r2) // Discriminant is negative, yielding only imaginary roots.\n\
    {\n\
        return czm_emptyRaySegment;  // ray does not intersect.\n\
    }\n\
    \n\
    float q = sqrt(r2 - m2);\n\
\n\
    if (czm_equalsEpsilon(q, 0.0)) // Discriminant is zero, yielding a double root.\n\
    {\n\
        return czm_raySegment(s, s);  // ray is tangent.\n\
    }\n\
        \n\
    if (l2 > r2) // Outside of sphere.\n\
    {\n\
	    czm_raySegment i = czm_raySegment(s - q, s + q);\n\
	    return i;\n\
    }\n\
    else if (l2 < r2) // Inside of sphere.\n\
   	{\n\
        czm_raySegment i = czm_raySegment(0.0, s + q);\n\
        return i;\n\
    }\n\
    else if (s > 0.0) // On sphere and looking inward.\n\
    {\n\
        czm_raySegment i = czm_raySegment(0.0, s + q);\n\
        return i;\n\
    }\n\
    else // On sphere and looking outward or tangent.\n\
    {\n\
        return czm_emptyRaySegment;\n\
   	}\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_sphereNormal\n\
 * @glslFunction\n\
 *\n\
 * @see czm_raySphereIntersectionInterval \n\
 * @see czm_pointAlongRay\n\
 */\n\
vec3 czm_sphereNormal(czm_sphere sphere, vec3 pointOnSphere)\n\
{\n\
    return normalize(pointOnSphere - sphere.center);\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_cone\n\
 * @glslStruct\n\
 */\n\
struct czm_cone\n\
{\n\
    vec3 vertex;\n\
    vec3 axis;          // Unit-length direction vector\n\
    float halfAperture;    // Measured from the cone axis to the cone wall\n\
	// PERFORMANCE_IDEA: Make sure all of these are used...\n\
    float cosineOfHalfAperture;\n\
    float cosineSquaredOfHalfAperture;\n\
    float sineOfHalfAperture;\n\
    float sineSquaredOfHalfAperture;\n\
    mat3 intersectionMatrix;\n\
};\n\
\n\
czm_cone czm_coneNew(vec3 vertex, vec3 axis, float halfAperture)\n\
{\n\
	float cosineOfHalfAperture = cos(halfAperture);\n\
	float cosineSquaredOfHalfAperture = cosineOfHalfAperture * cosineOfHalfAperture;\n\
	float sineOfHalfAperture = sin(halfAperture);\n\
	float sineSquaredOfHalfAperture = sineOfHalfAperture * sineOfHalfAperture;\n\
	\n\
    float x2 = axis.x * axis.x;\n\
    float y2 = axis.y * axis.y;\n\
    float z2 = axis.z * axis.z;\n\
    float xy = axis.x * axis.y;\n\
    float yz = axis.y * axis.z;\n\
    float zx = axis.z * axis.x;\n\
\n\
    // This is a symmetric matrix.\n\
    mat3 intersectionMatrix = mat3(\n\
    	cosineSquaredOfHalfAperture - x2, -xy,                              -zx,\n\
		-xy,                              cosineSquaredOfHalfAperture - y2, -yz,\n\
		-zx,                              -yz,                              cosineSquaredOfHalfAperture - z2);            \n\
	\n\
    czm_cone temp = czm_cone(vertex, axis, halfAperture,\n\
    	cosineOfHalfAperture, cosineSquaredOfHalfAperture,\n\
    	sineOfHalfAperture, sineSquaredOfHalfAperture, intersectionMatrix);\n\
    return temp;\n\
}\n\
\n\
/**\n\
 * Determines if a point is in, or on the boundary, of an infinite cone.\n\
 *\n\
 * @name czm_coneContainsPoint\n\
 * @glslFunction\n\
 *\n\
 * @param {czm_cone} cone The infinite cone.\n\
 * @param {vec3} point The point to test for containment.\n\
 *\n\
 * @returns {bool} <code>true</code> if the point is in the infinite cone; otherwise, <code>false</code>.\n\
 *\n\
 * @see czm_rayConeIntersectionInterval\n\
 *\n\
 * @example\n\
 * czm_cone cone = czm_coneNew(vec3(0.0), vec3(0.0, 0.0, 1.0), radians(45.0)); // vertex, axis, halfAperture\n\
 * vec3 point = vec3(1.0, 0.0, 0.0);\n\
 * bool b = czm_coneContainsPoint(cone, point)); // false\n\
 */\n\
bool czm_coneContainsPoint(czm_cone cone, vec3 point)\n\
{\n\
    vec3 n = normalize(point - cone.vertex);\n\
    return (dot(n, cone.axis) >= cone.cosineOfHalfAperture);\n\
}\n\
\n\
bool _czm_rayIntersectsReflectedCone(czm_ray ray, czm_cone cone, float time, float cosine)\n\
{\n\
    vec3 s = ray.origin + (time * ray.direction) - cone.vertex;  // The vector from the origin is at (vertex + s)\n\
    vec3 sUnit = normalize(s);\n\
    float c = dot(sUnit, cone.axis);\n\
    \n\
    return (sign(c) != sign(cosine));\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_rayConeIntersectionInterval\n\
 * @glslFunction\n\
 *\n\
 * @see czm_coneNormal\n\
 * @see czm_coneContainsPoint\n\
 */\n\
czm_raySegmentCollection czm_rayConeIntersectionInterval(czm_ray ray, czm_cone cone)\n\
{\n\
    vec3 temp = ray.origin - cone.vertex;\n\
\n\
    float t2 = dot(temp, temp);\n\
\n\
    float cosineNu = dot(ray.direction, cone.axis);\n\
\n\
    if (t2 == 0.0) // At vertex.\n\
    {\n\
        if (cosineNu >= cone.cosineOfHalfAperture) // Looking inward or along surface.\n\
        {\n\
            return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
        }\n\
        else // Looking outward.\n\
        {\n\
            return czm_raySegmentCollectionNew();\n\
        }\n\
    }\n\
    else // Not at vertex\n\
    {\n\
        float projection = dot(normalize(temp), cone.axis);\n\
\n\
        if (projection == cone.cosineOfHalfAperture) // On surface.\n\
        {\n\
            vec3 u = ray.direction;\n\
\n\
            mat3 crossProductMatrix = mat3(0.0, -u.z, u.y,\n\
                                            u.z, 0.0, -u.x,\n\
                                           -u.y, u.x, 0.0);\n\
            if (length(crossProductMatrix * temp) == 0.0) // Looking along surface.\n\
            {\n\
                if (dot(temp, u) > 0.0) // Looking away from vertex.\n\
                {\n\
                    return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
                }\n\
                else // Looking toward vertex.\n\
                {\n\
                    czm_raySegment i = czm_raySegment(0.0, length(temp));\n\
                    return czm_raySegmentCollectionNew(i);\n\
                }\n\
            }\n\
            else // Looking tangent at surface.\n\
            {\n\
                return czm_raySegmentCollectionNew();\n\
            }\n\
        }\n\
        else // Not on surface\n\
        {\n\
            vec3 t = normalize(temp);\n\
\n\
            float cosineAlpha2 = cone.cosineOfHalfAperture * cone.cosineOfHalfAperture;\n\
\n\
            float cosineTau = dot(t, cone.axis);\n\
            float cosineDelta = dot(t, ray.direction);\n\
\n\
            float cosineNu2 = cosineNu * cosineNu;\n\
            float cosineTau2 = cosineTau * cosineTau;\n\
\n\
            float stuff = cosineTau * cosineNu;\n\
\n\
            float positiveTerm = cosineNu2 + cosineTau2;\n\
            float negativeTerm = (cosineDelta * cosineDelta - 1.0) * cosineAlpha2;\n\
            float signedTerm = -2.0 * stuff * cosineDelta;\n\
\n\
            if (signedTerm > 0.0)\n\
            {\n\
                positiveTerm = positiveTerm + signedTerm;\n\
            }\n\
            else if (signedTerm < 0.0)\n\
            {\n\
                negativeTerm = negativeTerm + signedTerm;\n\
            }\n\
\n\
            float d = 4.0 * cosineAlpha2 * (positiveTerm + negativeTerm);\n\
\n\
            if (d < 0.0) // Imaginary roots.  No intersections.\n\
            {\n\
                if (cone.cosineOfHalfAperture < 0.0) // Obtuse cone.\n\
                {\n\
                    return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
                }\n\
                else // Acute cone.\n\
                {\n\
                    return czm_raySegmentCollectionNew();\n\
                }\n\
            }\n\
            else if (d > 0.0) // Distinct real roots.  Two intersections.\n\
            {\n\
                float a = cosineNu2 - cosineAlpha2;\n\
                float c = cosineTau2 - cosineAlpha2;\n\
                float b = 2.0 * (stuff - cosineDelta * cosineAlpha2);\n\
\n\
                float s = (b == 0.0) ? 1.0 : sign(b);\n\
                float q = -(b + s * sqrt(d)) / 2.0;\n\
\n\
                float first = q / a;\n\
                float second = c / q;\n\
                if (second < first)\n\
                {\n\
                    float thing = first;\n\
                    first = second;\n\
                    second = thing;\n\
                }\n\
\n\
                // Check roots to ensure that they are non-negative and intersect the desired nape of the cone.\n\
                bool firstTest = (first >= 0.0) && !(sign(dot(t + first * ray.direction, cone.axis)) == -sign(cone.cosineOfHalfAperture));\n\
                bool secondTest = (second >= 0.0) && !(sign(dot(t + second * ray.direction, cone.axis)) == -sign(cone.cosineOfHalfAperture));\n\
\n\
                float m = sqrt(t2);\n\
\n\
                if (cosineTau > cone.cosineOfHalfAperture) // Inside cone.\n\
                {\n\
                    if (firstTest && secondTest)\n\
                    {\n\
                        // Ray starts inside cone and exits; then enters and never exits.\n\
                        czm_raySegment one = czm_raySegment(0.0, m * first);\n\
                        czm_raySegment two = czm_raySegment(m * second, czm_infinity);\n\
                        return czm_raySegmentCollectionNew(one, two);\n\
                    }\n\
                    else if (firstTest)\n\
                    {\n\
                        // Ray starts inside cone and exits.\n\
                        czm_raySegment i = czm_raySegment(0.0, m * first);\n\
                        return czm_raySegmentCollectionNew(i);\n\
                    }\n\
                    else if (secondTest)\n\
                    {\n\
                        // Ray starts inside cone and exits.\n\
                        czm_raySegment i = czm_raySegment(0.0, m * second);\n\
                        return czm_raySegmentCollectionNew(i);\n\
                    }\n\
                    else\n\
                    {\n\
                        // Ray starts inside cone and never exits.\n\
                        return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
                    }\n\
                }\n\
                else\n\
                {\n\
                    if (firstTest && secondTest)\n\
                    {\n\
                        // Ray enters and exits.\n\
                        czm_raySegment i = czm_raySegment(m * first, m * second);\n\
                        return czm_raySegmentCollectionNew(i);\n\
                    }\n\
                    else if (firstTest)\n\
                    {\n\
                        // Ray enters and never exits.\n\
                        czm_raySegment i = czm_raySegment(m * first, czm_infinity);\n\
                        return czm_raySegmentCollectionNew(i);\n\
                    }\n\
                    else if (secondTest)\n\
                    {\n\
                        // Ray enters and never exits.\n\
                        czm_raySegment i = czm_raySegment(m * second, czm_infinity);\n\
                        return czm_raySegmentCollectionNew(i);\n\
                    }\n\
                    else\n\
                    {\n\
                        // Ray never enters.\n\
                        return czm_raySegmentCollectionNew();\n\
                    }\n\
                }\n\
            }\n\
            else // (d == 0.0)  Repeated real roots.  Two intersections.\n\
            {\n\
                if (cone.cosineOfHalfAperture == 0.0) // Planar cone.\n\
                {\n\
                    if (cosineTau >= 0.0) // Inside or on surface.\n\
                    {\n\
                        if (cosineNu >= 0.0) // Looking inward or tangent.\n\
                        {\n\
                            // Ray starts inside cone and never exits.\n\
                            return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
                        }\n\
                        else\n\
                        {\n\
                            // Ray starts inside cone and intersects.\n\
                            czm_raySegment i = czm_raySegment(0.0, -sqrt(t2) * cosineTau / cosineNu);\n\
                            return czm_raySegmentCollectionNew(i);\n\
                        }\n\
                    }\n\
                    else // Outside.\n\
                    {\n\
                        if (cosineNu <= 0.0) // Looking outward or tangent.\n\
                        {\n\
                            // Ray starts outside cone and never enters.\n\
                            return czm_raySegmentCollectionNew();\n\
                        }\n\
                        else\n\
                        {\n\
                            // Ray starts outside cone and intersects.\n\
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
\n\
                    float root = (a == 0.0) ? -sign(b) * czm_infinity : (-sign(b) / sign(a)) * sqrt(c / a);\n\
\n\
                    // Check roots to ensure that they are non-negative and intersect the desired nape of the cone.\n\
                    bool rootTest = (root >= 0.0) && !(sign(dot(t + root * ray.direction, cone.axis)) == -sign(cone.cosineOfHalfAperture));\n\
\n\
                    float m = sqrt(t2);\n\
\n\
                    if (cosineTau > cone.cosineOfHalfAperture) // Inside cone.\n\
                    {\n\
                        if (rootTest)\n\
                        {\n\
                            // Ray starts inside cone and exits or becomes tangent.\n\
                            czm_raySegment i = czm_raySegment(0.0, m * root);\n\
                            return czm_raySegmentCollectionNew(i);\n\
                        }\n\
                        else\n\
                        {\n\
                            // Ray starts inside cone and never exits.\n\
                            return czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
                        }\n\
                    }\n\
                    else\n\
                    {\n\
                        if (rootTest)\n\
                        {\n\
                            if (c < 0.0) // Outside both napes of the cone.\n\
                            {\n\
                                // Ray starts outside cone and becomes tangent.\n\
                                float thing = m * root;\n\
                                czm_raySegment i = czm_raySegment(thing, thing);\n\
                                return czm_raySegmentCollectionNew(i);\n\
                            }\n\
                            else\n\
                            {\n\
                                // Ray starts outside cone and enters at vertex.\n\
                                float thing = m * root;\n\
                                czm_raySegment i = czm_raySegment(thing, czm_infinity);\n\
                                return czm_raySegmentCollectionNew(i);\n\
                            }\n\
                        }\n\
                        else\n\
                        {\n\
                            // Ray never enters.\n\
                            return czm_raySegmentCollectionNew();\n\
                        }\n\
                    }\n\
                }\n\
            }\n\
        }\n\
    }\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_rayConeIntersectNormal\n\
 * @glslFunction \n\
 *\n\
 * @see czm_rayConeIntersectionInterval\n\
 * @see czm_pointAlongRay\n\
 *\n\
 * @example\n\
 * // Compute the outward-facing cone normal where a ray first intersects a cone\n\
 * czm_ray ray = czm_ray(vec3(0.0), vec3(0.0, 0.0, 1.0)); // origin, direction\n\
 * czm_cone cone = czm_coneNew(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0), radians(45.0)); // vertex, axis, halfAperture\n\
 * czm_raySegment i = czm_rayConeIntersectionInterval(ray, cone);\n\
 * vec3 normal = czm_coneNormal(cone, czm_pointAlongRay(ray, i.start));\n\
 */\n\
vec3 czm_coneNormal(czm_cone cone, vec3 pointOnCone)\n\
{\n\
    // PERFORMANCE_IDEA: Remove duplicate computation with _czm_rayIntersectsReflectedCone\n\
    vec3 s = pointOnCone - cone.vertex;     // Vector from the origin is at (vertex + s)\n\
    vec3 sUnit = normalize(s);\n\
    return normalize((cone.cosineOfHalfAperture * sUnit - cone.axis) / cone.sineOfHalfAperture);\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_ellipsoidSilhouetteCone\n\
 * @glslStruct\n\
 */\n\
struct czm_ellipsoidSilhouetteCone\n\
{\n\
    czm_ellipsoid ellipsoid;\n\
    vec3 pointOutsideEllipsoid;\n\
    czm_cone coneInScaledSpace;\n\
};\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_ellipsoidSilhouetteConeNormal\n\
 * @glslFunction\n\
 *\n\
 */\n\
vec3 czm_ellipsoidSilhouetteConeNormal(czm_ellipsoidSilhouetteCone cone, vec3 pointOnCone)\n\
{\n\
    vec3 pointOnScaledCone = cone.ellipsoid.inverseRadii * (czm_inverseView * vec4(pointOnCone, 1.0)).xyz;\n\
\n\
    vec3 scaledNormal = czm_coneNormal(cone.coneInScaledSpace, pointOnScaledCone);\n\
\n\
    vec3 temp = -normalize(czm_viewRotation * (cone.ellipsoid.radii * scaledNormal));\n\
    \n\
    return temp;\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_ellipsoidSilhouetteConeNew\n\
 * @glslFunction\n\
 *\n\
 */\n\
czm_ellipsoidSilhouetteCone czm_ellipsoidSilhouetteConeNew(czm_ellipsoid ellipsoid, vec3 pointOutsideEllipsoid)\n\
{\n\
	vec3 q = ellipsoid.inverseRadii * (czm_inverseView * vec4(pointOutsideEllipsoid, 1.0)).xyz;\n\
	vec3 axis = -normalize(q);\n\
	\n\
	float q2 = dot(q, q);\n\
	float sineSquaredOfHalfAperture = 1.0 / q2;\n\
	float sineOfHalfAperture = sqrt(sineSquaredOfHalfAperture);\n\
	float cosineSquaredOfHalfAperture = 1.0 - sineSquaredOfHalfAperture;\n\
	float cosineOfHalfAperture = sqrt(cosineSquaredOfHalfAperture);\n\
	float halfAperture = atan(sineOfHalfAperture / cosineOfHalfAperture);\n\
	\n\
    float x2 = axis.x * axis.x;\n\
    float y2 = axis.y * axis.y;\n\
    float z2 = axis.z * axis.z;\n\
    float xy = axis.x * axis.y;\n\
    float yz = axis.y * axis.z;\n\
    float zx = axis.z * axis.x;\n\
\n\
    // This is a symmetric matrix.\n\
    mat3 intersectionMatrix = mat3(\n\
    	cosineSquaredOfHalfAperture - x2, -xy,                              -zx,\n\
		-xy,                              cosineSquaredOfHalfAperture - y2, -yz,\n\
		-zx,                              -yz,                              cosineSquaredOfHalfAperture - z2);            \n\
	\n\
	czm_cone coneInScaledSpace = czm_cone(q, axis, halfAperture,\n\
		cosineOfHalfAperture, cosineSquaredOfHalfAperture,\n\
		sineOfHalfAperture, sineSquaredOfHalfAperture, intersectionMatrix);\n\
\n\
    // ANGLE workaround:  http://code.google.com/p/angleproject/issues/detail?id=185		\n\
	czm_ellipsoidSilhouetteCone temp = czm_ellipsoidSilhouetteCone(ellipsoid, pointOutsideEllipsoid, coneInScaledSpace);\n\
	return temp;\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_rayEllipsoidSilhouetteConeIntersectionInterval\n\
 * @glslFunction\n\
 *\n\
 */\n\
czm_raySegment czm_rayEllipsoidSilhouetteConeIntersectionInterval(czm_ray ray, czm_ellipsoidSilhouetteCone cone)\n\
{\n\
	// Determine the ray in the scaled space.\n\
	vec3 origin = cone.ellipsoid.inverseRadii * (czm_inverseView * vec4(ray.origin, 1.0)).xyz;\n\
	vec3 direction = normalize(cone.ellipsoid.inverseRadii * (czm_inverseViewRotation * ray.direction));\n\
	czm_ray rayInScaledSpace = czm_ray(origin, direction);\n\
	\n\
	// Perform the intersection in the scaled space.\n\
	czm_raySegmentCollection collection = czm_rayConeIntersectionInterval(rayInScaledSpace, cone.coneInScaledSpace);\n\
\n\
	if (collection.count == 0) // No intersection.\n\
	{\n\
		return czm_emptyRaySegment;\n\
	}\n\
	else // Intersection.\n\
	{\n\
        czm_raySegment interval = collection.intervals[0];\n\
        \n\
		// Honor ray origin case (start == 0.0).\n\
		float start = interval.start;\n\
		if (start != 0.0)\n\
		{\n\
			// Determine start in unscaled space.\n\
			vec3 temp = (czm_view * vec4(cone.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, start), 1.0)).xyz;\n\
			start = dot(temp, ray.direction);\n\
		}\n\
		\n\
		// Honor infinite ray (stop == infinity).\n\
		float stop = interval.stop;\n\
		if (stop != czm_infinity)\n\
		{\n\
			// Determine stop in unscaled space.\n\
			vec3 temp = (czm_view * vec4(cone.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, stop), 1.0)).xyz;\n\
			stop = dot(temp, ray.direction);\n\
		}\n\
		\n\
		return czm_raySegment(start, stop);\n\
	}\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_halfspace\n\
 * @glslStruct\n\
 */\n\
struct czm_halfspace\n\
{\n\
	vec3 center;\n\
	vec3 normal; // Unit vector.\n\
};\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_rayHalfspaceIntersectionInterval\n\
 * @glslFunction\n\
 *\n\
 */\n\
czm_raySegment czm_rayHalfspaceIntersectionInterval(czm_ray ray, czm_halfspace halfspace)\n\
{\n\
	float numerator = dot(halfspace.center - ray.origin, halfspace.normal);\n\
	float denominator = dot(ray.direction, halfspace.normal);\n\
	\n\
	if (numerator > 0.0) // Inside.\n\
	{\n\
		if (denominator > 0.0) // Looking outward.\n\
		{\n\
			return czm_raySegment(0.0, numerator / denominator);\n\
		}\n\
		else // Looking inward or parallel.\n\
		{\n\
			return czm_fullRaySegment;		\n\
		}\n\
	}\n\
	else if (numerator < 0.0) // Outside.\n\
	{\n\
		if (denominator < 0.0 ) // Looking inward.\n\
		{\n\
			return czm_raySegment(numerator / denominator, czm_infinity);		\n\
		}\n\
		else // Looking outward or parallel.\n\
		{\n\
			return czm_emptyRaySegment;\n\
		}\n\
	}\n\
	else // On surface.\n\
	{\n\
		if (denominator < 0.0 ) // Looking inward.\n\
		{\n\
			return czm_fullRaySegment;		\n\
		}\n\
		else // Looking outward or parallel.\n\
		{\n\
			return czm_emptyRaySegment;\n\
		}\n\
	}\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_ellipsoidSilhouetteHalfspace\n\
 * @glslStruct\n\
 */\n\
struct czm_ellipsoidSilhouetteHalfspace\n\
{\n\
    czm_ellipsoid ellipsoid;\n\
    vec3 pointOutsideEllipsoid;\n\
    czm_halfspace halfspaceInScaledSpace;\n\
};\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_ellipsoidSilhouetteHalfspaceNew\n\
 * @glslFunction\n\
 *\n\
 */\n\
czm_ellipsoidSilhouetteHalfspace czm_ellipsoidSilhouetteHalfspaceNew(czm_ellipsoid ellipsoid, vec3 pointOutsideEllipsoid)\n\
{\n\
	vec3 q = ellipsoid.inverseRadii * (czm_inverseView * vec4(pointOutsideEllipsoid, 1.0)).xyz;\n\
	float magnitude = 1.0 / length(q);\n\
	vec3 normal = normalize(q);\n\
	vec3 center = magnitude * normal;      \n\
	\n\
	czm_halfspace halfspaceInScaledSpace = czm_halfspace(center, normal);\n\
\n\
    // ANGLE workaround:  http://code.google.com/p/angleproject/issues/detail?id=185		\n\
	czm_ellipsoidSilhouetteHalfspace temp = czm_ellipsoidSilhouetteHalfspace(ellipsoid, pointOutsideEllipsoid, halfspaceInScaledSpace);\n\
	return temp;\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_rayEllipsoidSilhouetteHalfspaceIntersectionInterval\n\
 * @glslFunction\n\
 *\n\
 */\n\
czm_raySegment czm_rayEllipsoidSilhouetteHalfspaceIntersectionInterval(czm_ray ray, czm_ellipsoidSilhouetteHalfspace halfspace)\n\
{\n\
	// Determine the ray in the scaled space.\n\
	vec3 origin = halfspace.ellipsoid.inverseRadii * (czm_inverseView * vec4(ray.origin, 1.0)).xyz;\n\
	vec3 direction = halfspace.ellipsoid.inverseRadii * (czm_inverseViewRotation * ray.direction);\n\
	czm_ray rayInScaledSpace = czm_ray(origin, direction);\n\
	\n\
	// Perform the intersection in the scaled space.\n\
	czm_raySegment interval = czm_rayHalfspaceIntersectionInterval(rayInScaledSpace, halfspace.halfspaceInScaledSpace);\n\
\n\
	if (czm_isEmpty(interval)) // No intersection.\n\
	{\n\
		return interval;\n\
	}\n\
	else // Intersection.\n\
	{\n\
		// Honor ray origin case (start == 0.0).\n\
		float start = interval.start;\n\
		if (start != 0.0)\n\
		{\n\
			// Determine start in unscaled space.\n\
			vec3 temp = (czm_view * vec4(halfspace.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, start), 1.0)).xyz;\n\
			start = dot(temp, ray.direction);\n\
		}\n\
		\n\
		// Honor infinite ray (stop == infinity).\n\
		float stop = interval.stop;\n\
		if (stop != czm_infinity)\n\
		{\n\
			// Determine stop in unscaled space.\n\
			vec3 temp = (czm_view * vec4(halfspace.ellipsoid.radii * czm_pointAlongRay(rayInScaledSpace, stop), 1.0)).xyz;\n\
			stop = dot(temp, ray.direction);\n\
		}\n\
		\n\
		return czm_raySegment(start, stop);\n\
	}\n\
}\n\
";
});