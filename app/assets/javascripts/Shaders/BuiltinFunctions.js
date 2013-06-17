/**
 * @license
 * Description : Array and textureless GLSL 2D/3D/4D simplex 
 *               noise functions.
 *      Author : Ian McEwan, Ashima Arts.
 *  Maintainer : ijm
 *     Lastmod : 20110822 (ijm)
 *     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
 *               Distributed under the MIT License. See LICENSE file.
 *               https://github.com/ashima/webgl-noise
 */
/**
 * @license
 * Cellular noise ("Worley noise") in 2D in GLSL.
 * Copyright (c) Stefan Gustavson 2011-04-19. All rights reserved.
 * This code is released under the conditions of the MIT license.
 * See LICENSE file for details.
 */
//This file is automatically rebuilt by the Cesium build process.
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
bool czm_equalsEpsilon(vec4 left, vec4 right, float epsilon) {\n\
return all(lessThanEqual(abs(left - right), vec4(epsilon)));\n\
}\n\
bool czm_equalsEpsilon(vec3 left, vec3 right, float epsilon) {\n\
return all(lessThanEqual(abs(left - right), vec3(epsilon)));\n\
}\n\
bool czm_equalsEpsilon(vec2 left, vec2 right, float epsilon) {\n\
return all(lessThanEqual(abs(left - right), vec2(epsilon)));\n\
}\n\
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
vec3 tangentEC = normalize(czm_normal3D * tangentMC);\n\
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
float getLambertDiffuse(vec3 lightDirectionEC, vec3 normalEC)\n\
{\n\
return max(dot(lightDirectionEC, normalEC), 0.0);\n\
}\n\
float getLambertDiffuseOfMaterial(vec3 lightDirectionEC, czm_material material)\n\
{\n\
return getLambertDiffuse(lightDirectionEC, material.normal);\n\
}\n\
float getSpecular(vec3 lightDirectionEC, vec3 toEyeEC, vec3 normalEC, float shininess)\n\
{\n\
vec3 toReflectedLight = reflect(-lightDirectionEC, normalEC);\n\
float specular = max(dot(toReflectedLight, toEyeEC), 0.0);\n\
return pow(specular, shininess);\n\
}\n\
float getSpecularOfMaterial(vec3 lightDirectionEC, vec3 toEyeEC, czm_material material)\n\
{\n\
return getSpecular(lightDirectionEC, toEyeEC, material.normal, material.shininess);\n\
}\n\
vec4 czm_phong(vec3 toEye, czm_material material)\n\
{\n\
float diffuse = getLambertDiffuseOfMaterial(vec3(0.0, 0.0, 1.0), material) + getLambertDiffuseOfMaterial(vec3(0.0, 1.0, 0.0), material);\n\
float specular = getSpecularOfMaterial(czm_sunDirectionEC, toEye, material) + getSpecularOfMaterial(czm_moonDirectionEC, toEye, material);\n\
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
vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist, float fuzzFactor)\n\
{\n\
float val1 = clamp(dist / fuzzFactor, 0.0, 1.0);\n\
float val2 = clamp((dist - 0.5) / fuzzFactor, 0.0, 1.0);\n\
val1 = val1 * (1.0 - val2);\n\
val1 = val1 * val1 * (3.0 - (2.0 * val1));\n\
val1 = pow(val1, 0.5);\n\
vec4 midColor = (color1 + color2) * 0.5;\n\
return mix(midColor, currentColor, val1);\n\
}\n\
vec4 czm_antialias(vec4 color1, vec4 color2, vec4 currentColor, float dist)\n\
{\n\
return czm_antialias(color1, color2, currentColor, dist, 0.1);\n\
}\n\
vec3 czm_RGBToXYZ(vec3 rgb)\n\
{\n\
const mat3 RGB2XYZ = mat3(0.4124, 0.2126, 0.0193,\n\
0.3576, 0.7152, 0.1192,\n\
0.1805, 0.0722, 0.9505);\n\
vec3 xyz = RGB2XYZ * rgb;\n\
vec3 Yxy;\n\
Yxy.r = xyz.g;\n\
float temp = dot(vec3(1.0), xyz);\n\
Yxy.gb = xyz.rg / temp;\n\
return Yxy;\n\
}\n\
vec3 czm_XYZToRGB(vec3 Yxy)\n\
{\n\
const mat3 XYZ2RGB = mat3( 3.2405, -0.9693,  0.0556,\n\
-1.5371,  1.8760, -0.2040,\n\
-0.4985,  0.0416,  1.0572);\n\
vec3 xyz;\n\
xyz.r = Yxy.r * Yxy.g / Yxy.b;\n\
xyz.g = Yxy.r;\n\
xyz.b = Yxy.r * (1.0 - Yxy.g - Yxy.b) / Yxy.b;\n\
return XYZ2RGB * xyz;\n\
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
vec4 czm_getWaterNoise(sampler2D normalMap, vec2 uv, float time, float angleInRadians)\n\
{\n\
float cosAngle = cos(angleInRadians);\n\
float sinAngle = sin(angleInRadians);\n\
vec2 s0 = vec2(1.0/17.0, 0.0);\n\
vec2 s1 = vec2(-1.0/29.0, 0.0);\n\
vec2 s2 = vec2(1.0/101.0, 1.0/59.0);\n\
vec2 s3 = vec2(-1.0/109.0, -1.0/57.0);\n\
s0 = vec2((cosAngle * s0.x) - (sinAngle * s0.y), (sinAngle * s0.x) + (cosAngle * s0.y));\n\
s1 = vec2((cosAngle * s1.x) - (sinAngle * s1.y), (sinAngle * s1.x) + (cosAngle * s1.y));\n\
s2 = vec2((cosAngle * s2.x) - (sinAngle * s2.y), (sinAngle * s2.x) + (cosAngle * s2.y));\n\
s3 = vec2((cosAngle * s3.x) - (sinAngle * s3.y), (sinAngle * s3.x) + (cosAngle * s3.y));\n\
vec2 uv0 = (uv/103.0) + (time * s0);\n\
vec2 uv1 = uv/107.0 + (time * s1) + vec2(0.23);\n\
vec2 uv2 = uv/vec2(897.0, 983.0) + (time * s2) + vec2(0.51);\n\
vec2 uv3 = uv/vec2(991.0, 877.0) + (time * s3) + vec2(0.71);\n\
uv0 = fract(uv0);\n\
uv1 = fract(uv1);\n\
uv2 = fract(uv2);\n\
uv3 = fract(uv3);\n\
vec4 noise = (texture2D(normalMap, uv0)) +\n\
(texture2D(normalMap, uv1)) +\n\
(texture2D(normalMap, uv2)) +\n\
(texture2D(normalMap, uv3));\n\
return ((noise / 4.0) - 0.5) * 2.0;\n\
}\n\
vec4 _czm_mod289(vec4 x)\n\
{\n\
return x - floor(x * (1.0 / 289.0)) * 289.0;\n\
}\n\
vec3 _czm_mod289(vec3 x)\n\
{\n\
return x - floor(x * (1.0 / 289.0)) * 289.0;\n\
}\n\
vec2 _czm_mod289(vec2 x)\n\
{\n\
return x - floor(x * (1.0 / 289.0)) * 289.0;\n\
}\n\
float _czm_mod289(float x)\n\
{\n\
return x - floor(x * (1.0 / 289.0)) * 289.0;\n\
}\n\
vec4 _czm_permute(vec4 x)\n\
{\n\
return _czm_mod289(((x*34.0)+1.0)*x);\n\
}\n\
vec3 _czm_permute(vec3 x)\n\
{\n\
return _czm_mod289(((x*34.0)+1.0)*x);\n\
}\n\
float _czm_permute(float x)\n\
{\n\
return _czm_mod289(((x*34.0)+1.0)*x);\n\
}\n\
vec4 _czm_taylorInvSqrt(vec4 r)\n\
{\n\
return 1.79284291400159 - 0.85373472095314 * r;\n\
}\n\
float _czm_taylorInvSqrt(float r)\n\
{\n\
return 1.79284291400159 - 0.85373472095314 * r;\n\
}\n\
vec4 _czm_grad4(float j, vec4 ip)\n\
{\n\
const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n\
vec4 p,s;\n\
p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n\
p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n\
s = vec4(lessThan(p, vec4(0.0)));\n\
p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\
return p;\n\
}\n\
float czm_snoise(vec2 v)\n\
{\n\
const vec4 C = vec4(0.211324865405187,\n\
0.366025403784439,\n\
-0.577350269189626,\n\
0.024390243902439);\n\
vec2 i  = floor(v + dot(v, C.yy) );\n\
vec2 x0 = v -   i + dot(i, C.xx);\n\
vec2 i1;\n\
i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n\
vec4 x12 = x0.xyxy + C.xxzz;\n\
x12.xy -= i1;\n\
i = _czm_mod289(i);\n\
vec3 p = _czm_permute( _czm_permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));\n\
vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n\
m = m*m ;\n\
m = m*m ;\n\
vec3 x = 2.0 * fract(p * C.www) - 1.0;\n\
vec3 h = abs(x) - 0.5;\n\
vec3 ox = floor(x + 0.5);\n\
vec3 a0 = x - ox;\n\
m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\
vec3 g;\n\
g.x  = a0.x  * x0.x  + h.x  * x0.y;\n\
g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n\
return 130.0 * dot(m, g);\n\
}\n\
float czm_snoise(vec3 v)\n\
{\n\
const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n\
const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\
vec3 i  = floor(v + dot(v, C.yyy) );\n\
vec3 x0 =   v - i + dot(i, C.xxx) ;\n\
vec3 g = step(x0.yzx, x0.xyz);\n\
vec3 l = 1.0 - g;\n\
vec3 i1 = min( g.xyz, l.zxy );\n\
vec3 i2 = max( g.xyz, l.zxy );\n\
vec3 x1 = x0 - i1 + C.xxx;\n\
vec3 x2 = x0 - i2 + C.yyy;\n\
vec3 x3 = x0 - D.yyy;\n\
i = _czm_mod289(i);\n\
vec4 p = _czm_permute( _czm_permute( _czm_permute(\n\
i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n\
+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n\
+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\
float n_ = 0.142857142857;\n\
vec3  ns = n_ * D.wyz - D.xzx;\n\
vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n\
vec4 x_ = floor(j * ns.z);\n\
vec4 y_ = floor(j - 7.0 * x_ );\n\
vec4 x = x_ *ns.x + ns.yyyy;\n\
vec4 y = y_ *ns.x + ns.yyyy;\n\
vec4 h = 1.0 - abs(x) - abs(y);\n\
vec4 b0 = vec4( x.xy, y.xy );\n\
vec4 b1 = vec4( x.zw, y.zw );\n\
vec4 s0 = floor(b0)*2.0 + 1.0;\n\
vec4 s1 = floor(b1)*2.0 + 1.0;\n\
vec4 sh = -step(h, vec4(0.0));\n\
vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n\
vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\
vec3 p0 = vec3(a0.xy,h.x);\n\
vec3 p1 = vec3(a0.zw,h.y);\n\
vec3 p2 = vec3(a1.xy,h.z);\n\
vec3 p3 = vec3(a1.zw,h.w);\n\
vec4 norm = _czm_taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\
p0 *= norm.x;\n\
p1 *= norm.y;\n\
p2 *= norm.z;\n\
p3 *= norm.w;\n\
vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n\
m = m * m;\n\
return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n\
dot(p2,x2), dot(p3,x3) ) );\n\
}\n\
float czm_snoise(vec4 v)\n\
{\n\
const vec4  C = vec4( 0.138196601125011,\n\
0.276393202250021,\n\
0.414589803375032,\n\
-0.447213595499958);\n\
#define F4 0.309016994374947451\n\
vec4 i  = floor(v + dot(v, vec4(F4)) );\n\
vec4 x0 = v -   i + dot(i, C.xxxx);\n\
vec4 i0;\n\
vec3 isX = step( x0.yzw, x0.xxx );\n\
vec3 isYZ = step( x0.zww, x0.yyz );\n\
i0.x = isX.x + isX.y + isX.z;\n\
i0.yzw = 1.0 - isX;\n\
i0.y += isYZ.x + isYZ.y;\n\
i0.zw += 1.0 - isYZ.xy;\n\
i0.z += isYZ.z;\n\
i0.w += 1.0 - isYZ.z;\n\
vec4 i3 = clamp( i0, 0.0, 1.0 );\n\
vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n\
vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\
vec4 x1 = x0 - i1 + C.xxxx;\n\
vec4 x2 = x0 - i2 + C.yyyy;\n\
vec4 x3 = x0 - i3 + C.zzzz;\n\
vec4 x4 = x0 + C.wwww;\n\
i = _czm_mod289(i);\n\
float j0 = _czm_permute( _czm_permute( _czm_permute( _czm_permute(i.w) + i.z) + i.y) + i.x);\n\
vec4 j1 = _czm_permute( _czm_permute( _czm_permute( _czm_permute (\n\
i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n\
+ i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n\
+ i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n\
+ i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\
vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\
vec4 p0 = _czm_grad4(j0,   ip);\n\
vec4 p1 = _czm_grad4(j1.x, ip);\n\
vec4 p2 = _czm_grad4(j1.y, ip);\n\
vec4 p3 = _czm_grad4(j1.z, ip);\n\
vec4 p4 = _czm_grad4(j1.w, ip);\n\
vec4 norm = _czm_taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\
p0 *= norm.x;\n\
p1 *= norm.y;\n\
p2 *= norm.z;\n\
p3 *= norm.w;\n\
p4 *= _czm_taylorInvSqrt(dot(p4,p4));\n\
vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n\
vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n\
m0 = m0 * m0;\n\
m1 = m1 * m1;\n\
return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n\
+ dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\
}\n\
vec3 _czm_permute289(vec3 x)\n\
{\n\
return mod((34.0 * x + 1.0) * x, 289.0);\n\
}\n\
vec2 czm_cellular(vec2 P)\n\
{\n\
#define K 0.142857142857\n\
#define Ko 0.428571428571\n\
#define jitter 1.0\n\
vec2 Pi = mod(floor(P), 289.0);\n\
vec2 Pf = fract(P);\n\
vec3 oi = vec3(-1.0, 0.0, 1.0);\n\
vec3 of = vec3(-0.5, 0.5, 1.5);\n\
vec3 px = _czm_permute289(Pi.x + oi);\n\
vec3 p = _czm_permute289(px.x + Pi.y + oi);\n\
vec3 ox = fract(p*K) - Ko;\n\
vec3 oy = mod(floor(p*K),7.0)*K - Ko;\n\
vec3 dx = Pf.x + 0.5 + jitter*ox;\n\
vec3 dy = Pf.y - of + jitter*oy;\n\
vec3 d1 = dx * dx + dy * dy;\n\
p = _czm_permute289(px.y + Pi.y + oi);\n\
ox = fract(p*K) - Ko;\n\
oy = mod(floor(p*K),7.0)*K - Ko;\n\
dx = Pf.x - 0.5 + jitter*ox;\n\
dy = Pf.y - of + jitter*oy;\n\
vec3 d2 = dx * dx + dy * dy;\n\
p = _czm_permute289(px.z + Pi.y + oi);\n\
ox = fract(p*K) - Ko;\n\
oy = mod(floor(p*K),7.0)*K - Ko;\n\
dx = Pf.x - 1.5 + jitter*ox;\n\
dy = Pf.y - of + jitter*oy;\n\
vec3 d3 = dx * dx + dy * dy;\n\
vec3 d1a = min(d1, d2);\n\
d2 = max(d1, d2);\n\
d2 = min(d2, d3);\n\
d1 = min(d1a, d2);\n\
d2 = max(d1a, d2);\n\
d1.xy = (d1.x < d1.y) ? d1.xy : d1.yx;\n\
d1.xz = (d1.x < d1.z) ? d1.xz : d1.zx;\n\
d1.yz = min(d1.yz, d2.yz);\n\
d1.y = min(d1.y, d1.z);\n\
d1.y = min(d1.y, d2.x);\n\
return sqrt(d1.xy);\n\
}\n\
";
});