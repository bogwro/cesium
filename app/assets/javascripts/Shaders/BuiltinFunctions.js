// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "const float czm_infinity = 5906376272000.0;\n\
const float czm_epsilon1 = 0.1;\n\
const float czm_epsilon2 = 0.01;\n\
const float czm_epsilon3 = 0.001;\n\
const float czm_epsilon4 = 0.0001;\n\
const float czm_epsilon5 = 0.00001;\n\
const float czm_epsilon6 = 0.000001;\n\
const float czm_epsilon7 = 0.0000001;\n\
bool czm_equalsEpsilon(float left, float right, float epsilon) {\n\
return (abs(left - right) <= epsilon);\n\
}\n\
bool czm_equalsEpsilon(float left, float right) {\n\
return (abs(left - right) <= czm_epsilon7);\n\
}\n\
mat2 czm_transpose(mat2 matrix)\n\
{\n\
return mat2(\n\
matrix[0][0], matrix[1][0],\n\
matrix[0][1], matrix[1][1]);\n\
}\n\
mat3 czm_transpose(mat3 matrix)\n\
{\n\
return mat3(\n\
matrix[0][0], matrix[1][0], matrix[2][0],\n\
matrix[0][1], matrix[1][1], matrix[2][1],\n\
matrix[0][2], matrix[1][2], matrix[2][2]);\n\
}\n\
mat4 czm_transpose(mat4 matrix)\n\
{\n\
return mat4(\n\
matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0],\n\
matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1],\n\
matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2],\n\
matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]);\n\
}\n\
vec4 czm_modelToWindowCoordinates(vec4 position)\n\
{\n\
vec4 q = czm_modelViewProjection * position;\n\
q.xyz /= q.w;\n\
q.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz;\n\
return q;\n\
}\n\
vec4 czm_eyeToWindowCoordinates(vec4 positionEC)\n\
{\n\
vec4 q = czm_projection * positionEC;\n\
q.xyz /= q.w;\n\
q.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz;\n\
return q;\n\
}\n\
vec4 czm_windowToEyeCoordinates(vec4 fragmentCoordinate)\n\
{\n\
float x = 2.0 * (fragmentCoordinate.x - czm_viewport.x) / czm_viewport.z - 1.0;\n\
float y = 2.0 * (fragmentCoordinate.y - czm_viewport.y) / czm_viewport.w - 1.0;\n\
float z = (fragmentCoordinate.z - czm_viewportTransformation[3][2]) / czm_viewportTransformation[2][2];\n\
vec4 q = vec4(x, y, z, 1.0);\n\
q /= fragmentCoordinate.w;\n\
q = czm_inverseProjection * q;\n\
return q;\n\
}\n\
vec4 czm_eyeOffset(vec4 positionEC, vec3 eyeOffset)\n\
{\n\
vec4 p = positionEC;\n\
vec4 zEyeOffset = normalize(p) * eyeOffset.z;\n\
p.xy += eyeOffset.xy + zEyeOffset.xy;\n\
p.z += zEyeOffset.z;\n\
return p;\n\
}\n\
vec3 czm_geodeticSurfaceNormal(vec3 positionOnEllipsoid, vec3 ellipsoidCenter, vec3 oneOverEllipsoidRadiiSquared)\n\
{\n\
return normalize((positionOnEllipsoid - ellipsoidCenter) * oneOverEllipsoidRadiiSquared);\n\
}\n\
vec2 czm_ellipsoidWgs84TextureCoordinates(vec3 normal)\n\
{\n\
return vec2(atan(normal.y, normal.x) * czm_oneOverTwoPi + 0.5, asin(normal.z) * czm_oneOverPi + 0.5);\n\
}\n\
mat3 czm_eastNorthUpToEyeCoordinates(vec3 positionMC, vec3 normalEC)\n\
{\n\
vec3 tangentMC = normalize(vec3(-positionMC.y, positionMC.x, 0.0));\n\
vec3 tangentEC = normalize(czm_normal * tangentMC);\n\
vec3 bitangentEC = normalize(cross(normalEC, tangentEC));\n\
return mat3(\n\
tangentEC.x,   tangentEC.y,   tangentEC.z,\n\
bitangentEC.x, bitangentEC.y, bitangentEC.z,\n\
normalEC.x,    normalEC.y,    normalEC.z);\n\
}\n\
struct czm_materialInput\n\
{\n\
float s;\n\
vec2 st;\n\
vec3 str;\n\
vec3 normalEC;\n\
mat3 tangentToEyeMatrix;\n\
vec3 positionToEyeEC;\n\
vec3 positionMC;\n\
};\n\
struct czm_material\n\
{\n\
vec3 diffuse;\n\
float specular;\n\
float shininess;\n\
vec3 normal;\n\
vec3 emission;\n\
float alpha;\n\
};\n\
czm_material czm_getDefaultMaterial(czm_materialInput materialInput)\n\
{\n\
czm_material material;\n\
material.diffuse = vec3(0.0);\n\
material.specular = 0.0;\n\
material.shininess = 1.0;\n\
material.normal = materialInput.normalEC;\n\
material.emission = vec3(0.0);\n\
material.alpha = 1.0;\n\
return material;\n\
}\n\
float getLambertDiffuse(vec3 lightDirection, czm_material material)\n\
{\n\
return max(dot(lightDirection, material.normal), 0.0);\n\
}\n\
float getSpecular(vec3 lightDirection, vec3 toEye, czm_material material)\n\
{\n\
vec3 toReflectedLight = reflect(-lightDirection, material.normal);\n\
float specular = max(dot(toReflectedLight, toEye), 0.0);\n\
return pow(specular, material.shininess);\n\
}\n\
vec4 czm_phong(vec3 toEye, czm_material material)\n\
{\n\
float diffuse = getLambertDiffuse(vec3(0.0, 0.0, 1.0), material) + getLambertDiffuse(vec3(0.0, 1.0, 0.0), material);\n\
float specular = getSpecular(czm_sunDirectionEC, toEye, material) + getSpecular(czm_moonDirectionEC, toEye, material);\n\
vec3 ambient = vec3(0.0);\n\
vec3 color = ambient + material.emission;\n\
color += material.diffuse * diffuse;\n\
color += material.specular * specular;\n\
return vec4(color, material.alpha);\n\
}\n\
float czm_luminance(vec3 rgb)\n\
{\n\
const vec3 W = vec3(0.2125, 0.7154, 0.0721);\n\
return dot(rgb, W);\n\
}\n\
vec3 czm_hue(vec3 rgb, float adjustment)\n\
{\n\
const mat3 toYIQ = mat3(0.299,     0.587,     0.114,\n\
0.595716, -0.274453, -0.321263,\n\
0.211456, -0.522591,  0.311135);\n\
const mat3 toRGB = mat3(1.0,  0.9563,  0.6210,\n\
1.0, -0.2721, -0.6474,\n\
1.0, -1.107,   1.7046);\n\
vec3 yiq = toYIQ * rgb;\n\
float hue = atan(yiq.z, yiq.y) + adjustment;\n\
float chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);\n\
vec3 color = vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));\n\
return toRGB * color;\n\
}\n\
vec3 czm_saturation(vec3 rgb, float adjustment)\n\
{\n\
vec3 intensity = vec3(czm_luminance(rgb));\n\
return mix(intensity, rgb, adjustment);\n\
}\n\
vec3 czm_multiplyWithColorBalance(vec3 left, vec3 right)\n\
{\n\
const vec3 W = vec3(0.2125, 0.7154, 0.0721);\n\
vec3 target = left * right;\n\
float leftLuminance = dot(left, W);\n\
float rightLuminance = dot(right, W);\n\
float targetLuminance = dot(target, W);\n\
return ((leftLuminance + rightLuminance) / (2.0 * targetLuminance)) * target;\n\
}\n\
const float czm_webMercatorMaxLatitude = 1.4844222297453323669610967939;\n\
const int czm_scene2D = 0;\n\
const int czm_columbusView = 1;\n\
const int czm_scene3D = 2;\n\
const int czm_morphing = 3;\n\
vec4 czm_columbusViewMorph(vec3 position2D, vec3 position3D, float time)\n\
{\n\
vec3 p = mix(position2D, position3D, time);\n\
return vec4(p, 1.0);\n\
}\n\
struct czm_ray\n\
{\n\
vec3 origin;\n\
vec3 direction;\n\
};\n\
vec3 czm_pointAlongRay(czm_ray ray, float time)\n\
{\n\
return ray.origin + (time * ray.direction);\n\
}\n\
struct czm_raySegment\n\
{\n\
float start;\n\
float stop;\n\
};\n\
const czm_raySegment czm_emptyRaySegment = czm_raySegment(-czm_infinity, -czm_infinity);\n\
const czm_raySegment czm_fullRaySegment = czm_raySegment(0.0, czm_infinity);\n\
bool czm_isEmpty(czm_raySegment interval)\n\
{\n\
return (interval.stop < 0.0);\n\
}\n\
bool czm_isFull(czm_raySegment interval)\n\
{\n\
return (interval.start == 0.0 && interval.stop == czm_infinity);\n\
}\n\
struct czm_ellipsoid\n\
{\n\
vec3 center;\n\
vec3 radii;\n\
vec3 inverseRadii;\n\
vec3 inverseRadiiSquared;\n\
};\n\
czm_ellipsoid czm_ellipsoidNew(vec3 center, vec3 radii)\n\
{\n\
vec3 inverseRadii = vec3(1.0 / radii.x, 1.0 / radii.y, 1.0 / radii.z);\n\
vec3 inverseRadiiSquared = inverseRadii * inverseRadii;\n\
czm_ellipsoid temp = czm_ellipsoid(center, radii, inverseRadii, inverseRadiiSquared);\n\
return temp;\n\
}\n\
bool czm_ellipsoidContainsPoint(czm_ellipsoid ellipsoid, vec3 point)\n\
{\n\
vec3 scaled = ellipsoid.inverseRadii * (czm_inverseModelView * vec4(point, 1.0)).xyz;\n\
return (dot(scaled, scaled) <= 1.0);\n\
}\n\
czm_raySegment czm_rayEllipsoidIntersectionInterval(czm_ray ray, czm_ellipsoid ellipsoid)\n\
{\n\
vec3 q = ellipsoid.inverseRadii * (czm_inverseModelView * vec4(ray.origin, 1.0)).xyz;\n\
vec3 w = ellipsoid.inverseRadii * (czm_inverseModelView * vec4(ray.direction, 0.0)).xyz;\n\
q = q - ellipsoid.inverseRadii * (czm_inverseModelView * vec4(ellipsoid.center, 1.0)).xyz;\n\
float q2 = dot(q, q);\n\
float qw = dot(q, w);\n\
if (q2 > 1.0)\n\
{\n\
if (qw >= 0.0)\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
else\n\
{\n\
float qw2 = qw * qw;\n\
float difference = q2 - 1.0;\n\
float w2 = dot(w, w);\n\
float product = w2 * difference;\n\
if (qw2 < product)\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
else if (qw2 > product)\n\
{\n\
float discriminant = qw * qw - product;\n\
float temp = -qw + sqrt(discriminant);\n\
float root0 = temp / w2;\n\
float root1 = difference / temp;\n\
if (root0 < root1)\n\
{\n\
czm_raySegment i = czm_raySegment(root0, root1);\n\
return i;\n\
}\n\
else\n\
{\n\
czm_raySegment i = czm_raySegment(root1, root0);\n\
return i;\n\
}\n\
}\n\
else\n\
{\n\
float root = sqrt(difference / w2);\n\
czm_raySegment i = czm_raySegment(root, root);\n\
return i;\n\
}\n\
}\n\
}\n\
else if (q2 < 1.0)\n\
{\n\
float difference = q2 - 1.0;\n\
float w2 = dot(w, w);\n\
float product = w2 * difference;\n\
float discriminant = qw * qw - product;\n\
float temp = -qw + sqrt(discriminant);\n\
czm_raySegment i = czm_raySegment(0.0, temp / w2);\n\
return i;\n\
}\n\
else\n\
{\n\
if (qw < 0.0)\n\
{\n\
float w2 = dot(w, w);\n\
czm_raySegment i = czm_raySegment(0.0, -qw / w2);\n\
return i;\n\
}\n\
else\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
}\n\
}\n\
czm_ellipsoid czm_getWgs84EllipsoidEC()\n\
{\n\
return czm_ellipsoidNew(\n\
czm_view[3].xyz,\n\
vec3(6378137.0, 6378137.0, 6356752.314245));\n\
}\n\
float czm_latitudeToWebMercatorFraction(float latitude, float southMercatorYLow, float southMercatorYHigh, float oneOverMercatorHeight)\n\
{\n\
float sinLatitude = sin(latitude);\n\
float mercatorY = 0.5 * log((1.0 + sinLatitude) / (1.0 - sinLatitude));\n\
float t1 = 0.0 - southMercatorYLow;\n\
float e = t1 - 0.0;\n\
float t2 = ((-southMercatorYLow - e) + (0.0 - (t1 - e))) + mercatorY - southMercatorYHigh;\n\
float highDifference = t1 + t2;\n\
float lowDifference = t2 - (highDifference - t1);\n\
return highDifference * oneOverMercatorHeight + lowDifference * oneOverMercatorHeight;\n\
}\n\
vec3 czm_translateRelativeToEye(vec3 high, vec3 low)\n\
{\n\
vec3 highDifference = high - czm_encodedCameraPositionMCHigh;\n\
vec3 lowDifference = low - czm_encodedCameraPositionMCLow;\n\
return highDifference + lowDifference;\n\
}\n\
";
});