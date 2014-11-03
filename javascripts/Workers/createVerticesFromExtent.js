/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2013 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define("Core/defaultValue",[],function(){var t=function(t,e){return t!==void 0?t:e};return t}),define("Core/DeveloperError",[],function(){var t=function(t){this.name="DeveloperError",this.message=t,this.error=Error()};return t.prototype.toString=function(){var t=this.name+": "+this.message;return this.error!==void 0&&(t+=this.error.stack!==void 0?"\n"+(""+this.error.stack):"\n"+(""+this.error)),t},t}),define("Core/Math",["./defaultValue","./DeveloperError"],function(t,e){var r={};r.EPSILON1=.1,r.EPSILON2=.01,r.EPSILON3=.001,r.EPSILON4=1e-4,r.EPSILON5=1e-5,r.EPSILON6=1e-6,r.EPSILON7=1e-7,r.EPSILON8=1e-8,r.EPSILON9=1e-9,r.EPSILON10=1e-10,r.EPSILON11=1e-11,r.EPSILON12=1e-12,r.EPSILON13=1e-13,r.EPSILON14=1e-14,r.EPSILON15=1e-15,r.EPSILON16=1e-16,r.EPSILON17=1e-17,r.EPSILON18=1e-18,r.EPSILON19=1e-19,r.EPSILON20=1e-20,r.GRAVITATIONALPARAMETER=3986004418e5,r.sign=function(t){return t>0?1:0>t?-1:0},r.sinh=function(t){var e=Math.pow(Math.E,t),r=Math.pow(Math.E,-1*t);return.5*(e-r)},r.cosh=function(t){var e=Math.pow(Math.E,t),r=Math.pow(Math.E,-1*t);return.5*(e+r)},r.lerp=function(t,e,r){return(1-r)*t+r*e},r.PI=Math.PI,r.ONE_OVER_PI=1/Math.PI,r.PI_OVER_TWO=.5*Math.PI,r.PI_OVER_THREE=Math.PI/3,r.PI_OVER_FOUR=Math.PI/4,r.PI_OVER_SIX=Math.PI/6,r.THREE_PI_OVER_TWO=.5*3*Math.PI,r.TWO_PI=2*Math.PI,r.ONE_OVER_TWO_PI=1/(2*Math.PI),r.RADIANS_PER_DEGREE=Math.PI/180,r.DEGREES_PER_RADIAN=180/Math.PI,r.RADIANS_PER_ARCSECOND=r.RADIANS_PER_DEGREE/3600,r.toRadians=function(t){return t*r.RADIANS_PER_DEGREE},r.toDegrees=function(t){return t*r.DEGREES_PER_RADIAN},r.convertLongitudeRange=function(t){var e=r.TWO_PI,i=t-Math.floor(t/e)*e;return-Math.PI>i?i+e:i>=Math.PI?i-e:i},r.negativePiToPi=function(t){for(var e=r.EPSILON10,i=r.PI,n=r.TWO_PI;-(i+e)>t;)t+=n;if(-i>t)return-i;for(;t>i+e;)t-=n;return t>i?i:t},r.equalsEpsilon=function(t,e,r){return r=r||0,r>=Math.abs(t-e)};var i=[1];return r.factorial=function(t){if("number"!=typeof t||0>t)throw new e("A number greater than or equal to 0 is required.");var r=i.length;if(t>=r)for(var n=i[r-1],o=r;t>=o;o++)i.push(n*o);return i[t]},r.incrementWrap=function(r,i,n){if(n=t(n,0),n>=i)throw new e("Maximum value must be greater than minimum value.");return++r,r>i&&(r=n),r},r.isPowerOfTwo=function(t){if("number"!=typeof t||0>t)throw new e("A number greater than or equal to 0 is required.");var r=0|t;return 0!==r&&0===(r&r-1)},r.clamp=function(t,e,r){return e>t?e:t>r?r:t},r}),define("Core/freezeObject",[],function(){var t=Object.freeze;return t===void 0&&(t=function(t){return t}),t}),define("Core/Cartesian3",["./defaultValue","./DeveloperError","./freezeObject"],function(t,e,r){var i=function(e,r,i){this.x=t(e,0),this.y=t(r,0),this.z=t(i,0)};i.fromSpherical=function(r,n){if(r===void 0)throw new e("spherical is required");n===void 0&&(n=new i);var o=r.clock,a=r.cone,u=t(r.magnitude,1),s=u*Math.sin(a);return n.x=s*Math.cos(o),n.y=s*Math.sin(o),n.z=u*Math.cos(a),n},i.clone=function(t,r){if(t===void 0)throw new e("cartesian is required");return r===void 0?new i(t.x,t.y,t.z):(r.x=t.x,r.y=t.y,r.z=t.z,r)},i.fromCartesian4=i.clone,i.getMaximumComponent=function(t){if(t===void 0)throw new e("cartesian is required");return Math.max(t.x,t.y,t.z)},i.getMinimumComponent=function(t){if(t===void 0)throw new e("cartesian is required");return Math.min(t.x,t.y,t.z)},i.magnitudeSquared=function(t){if(t===void 0)throw new e("cartesian is required");return t.x*t.x+t.y*t.y+t.z*t.z},i.magnitude=function(t){return Math.sqrt(i.magnitudeSquared(t))},i.normalize=function(t,r){if(t===void 0)throw new e("cartesian is required");var n=i.magnitude(t);return r===void 0?new i(t.x/n,t.y/n,t.z/n):(r.x=t.x/n,r.y=t.y/n,r.z=t.z/n,r)},i.dot=function(t,r){if(t===void 0)throw new e("left is required");if(r===void 0)throw new e("right is required");return t.x*r.x+t.y*r.y+t.z*r.z},i.multiplyComponents=function(t,r,n){if(t===void 0)throw new e("left is required");if(r===void 0)throw new e("right is required");return n===void 0?new i(t.x*r.x,t.y*r.y,t.z*r.z):(n.x=t.x*r.x,n.y=t.y*r.y,n.z=t.z*r.z,n)},i.add=function(t,r,n){if(t===void 0)throw new e("left is required");if(r===void 0)throw new e("right is required");return n===void 0?new i(t.x+r.x,t.y+r.y,t.z+r.z):(n.x=t.x+r.x,n.y=t.y+r.y,n.z=t.z+r.z,n)},i.subtract=function(t,r,n){if(t===void 0)throw new e("left is required");if(r===void 0)throw new e("right is required");return n===void 0?new i(t.x-r.x,t.y-r.y,t.z-r.z):(n.x=t.x-r.x,n.y=t.y-r.y,n.z=t.z-r.z,n)},i.multiplyByScalar=function(t,r,n){if(t===void 0)throw new e("cartesian is required");if("number"!=typeof r)throw new e("scalar is required and must be a number.");return n===void 0?new i(t.x*r,t.y*r,t.z*r):(n.x=t.x*r,n.y=t.y*r,n.z=t.z*r,n)},i.divideByScalar=function(t,r,n){if(t===void 0)throw new e("cartesian is required");if("number"!=typeof r)throw new e("scalar is required and must be a number.");return n===void 0?new i(t.x/r,t.y/r,t.z/r):(n.x=t.x/r,n.y=t.y/r,n.z=t.z/r,n)},i.negate=function(t,r){if(t===void 0)throw new e("cartesian is required");return r===void 0?new i(-t.x,-t.y,-t.z):(r.x=-t.x,r.y=-t.y,r.z=-t.z,r)},i.abs=function(t,r){if(t===void 0)throw new e("cartesian is required");return r===void 0?new i(Math.abs(t.x),Math.abs(t.y),Math.abs(t.z)):(r.x=Math.abs(t.x),r.y=Math.abs(t.y),r.z=Math.abs(t.z),r)};var n=new i;i.lerp=function(t,r,o,a){if(t===void 0)throw new e("start is required.");if(r===void 0)throw new e("end is required.");if("number"!=typeof o)throw new e("t is required and must be a number.");return i.multiplyByScalar(r,o,n),a=i.multiplyByScalar(t,1-o,a),i.add(n,a,a)};var o=new i,a=new i;i.angleBetween=function(t,r){if(t===void 0)throw new e("left is required");if(r===void 0)throw new e("right is required");i.normalize(t,o),i.normalize(r,a);var n=i.dot(o,a),u=i.cross(o,a,o).magnitude();return Math.atan2(u,n)};var u=new i;return i.mostOrthogonalAxis=function(t,r){if(t===void 0)throw new e("cartesian is required.");var n=i.normalize(t,u);return i.abs(n,n),r=n.y>=n.x?n.z>=n.x?i.clone(i.UNIT_X,r):i.clone(i.UNIT_Z,r):n.z>=n.y?i.clone(i.UNIT_Y,r):i.clone(i.UNIT_Z,r)},i.equals=function(t,e){return t===e||t!==void 0&&e!==void 0&&t.x===e.x&&t.y===e.y&&t.z===e.z},i.equalsEpsilon=function(t,r,i){if("number"!=typeof i)throw new e("epsilon is required and must be a number.");return t===r||t!==void 0&&r!==void 0&&i>=Math.abs(t.x-r.x)&&i>=Math.abs(t.y-r.y)&&i>=Math.abs(t.z-r.z)},i.cross=function(t,r,n){if(t===void 0)throw new e("left is required");if(r===void 0)throw new e("right is required");var o=t.x,a=t.y,u=t.z,s=r.x,h=r.y,d=r.z,c=a*d-u*h,f=u*s-o*d,l=o*h-a*s;return n===void 0?new i(c,f,l):(n.x=c,n.y=f,n.z=l,n)},i.ZERO=r(new i(0,0,0)),i.UNIT_X=r(new i(1,0,0)),i.UNIT_Y=r(new i(0,1,0)),i.UNIT_Z=r(new i(0,0,1)),i.prototype.getMaximumComponent=function(){return i.getMaximumComponent(this)},i.prototype.getMinimumComponent=function(){return i.getMinimumComponent(this)},i.prototype.clone=function(t){return i.clone(this,t)},i.prototype.magnitudeSquared=function(){return i.magnitudeSquared(this)},i.prototype.magnitude=function(){return i.magnitude(this)},i.prototype.normalize=function(t){return i.normalize(this,t)},i.prototype.dot=function(t){return i.dot(this,t)},i.prototype.multiplyComponents=function(t,e){return i.multiplyComponents(this,t,e)},i.prototype.add=function(t,e){return i.add(this,t,e)},i.prototype.subtract=function(t,e){return i.subtract(this,t,e)},i.prototype.multiplyByScalar=function(t,e){return i.multiplyByScalar(this,t,e)},i.prototype.divideByScalar=function(t,e){return i.divideByScalar(this,t,e)},i.prototype.negate=function(t){return i.negate(this,t)},i.prototype.abs=function(t){return i.abs(this,t)},i.prototype.lerp=function(t,e,r){return i.lerp(this,t,e,r)},i.prototype.angleBetween=function(t){return i.angleBetween(this,t)},i.prototype.mostOrthogonalAxis=function(t){return i.mostOrthogonalAxis(this,t)},i.prototype.equals=function(t){return i.equals(this,t)},i.prototype.equalsEpsilon=function(t,e){return i.equalsEpsilon(this,t,e)},i.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"},i.prototype.cross=function(t,e){return i.cross(this,t,e)},i}),define("Core/Cartographic",["./defaultValue","./DeveloperError","./freezeObject","./Math"],function(t,e,r,i){var n=function(e,r,i){this.longitude=t(e,0),this.latitude=t(r,0),this.height=t(i,0)};return n.fromDegrees=function(e,r,o,a){return e=i.toRadians(t(e,0)),r=i.toRadians(t(r,0)),o=t(o,0),a===void 0?new n(e,r,o):(a.longitude=e,a.latitude=r,a.height=o,a)},n.clone=function(t,r){if(t===void 0)throw new e("cartographic is required");return r===void 0?new n(t.longitude,t.latitude,t.height):(r.longitude=t.longitude,r.latitude=t.latitude,r.height=t.height,r)},n.equals=function(t,e){return t===e||t!==void 0&&e!==void 0&&t.longitude===e.longitude&&t.latitude===e.latitude&&t.height===e.height},n.equalsEpsilon=function(t,r,i){if("number"!=typeof i)throw new e("epsilon is required and must be a number.");return t===r||t!==void 0&&r!==void 0&&i>=Math.abs(t.longitude-r.longitude)&&i>=Math.abs(t.latitude-r.latitude)&&i>=Math.abs(t.height-r.height)},n.toString=function(t){if(t===void 0)throw new e("cartographic is required");return"("+t.longitude+", "+t.latitude+", "+t.height+")"},n.ZERO=r(new n(0,0,0)),n.prototype.clone=function(t){return n.clone(this,t)},n.prototype.equals=function(t){return n.equals(this,t)},n.prototype.equalsEpsilon=function(t,e){return n.equalsEpsilon(this,t,e)},n.prototype.toString=function(){return n.toString(this)},n}),define("Core/Ellipsoid",["./freezeObject","./defaultValue","./DeveloperError","./Math","./Cartesian3","./Cartographic"],function(t,e,r,i,n,o){var a=function(t,o,a){if(t=e(t,0),o=e(o,0),a=e(a,0),0>t||0>o||0>a)throw new r("All radii components must be greater than or equal to zero.");this._radii=new n(t,o,a),this._radiiSquared=new n(t*t,o*o,a*a),this._radiiToTheFourth=new n(t*t*t*t,o*o*o*o,a*a*a*a),this._oneOverRadii=new n(0===t?0:1/t,0===o?0:1/o,0===a?0:1/a),this._oneOverRadiiSquared=new n(0===t?0:1/(t*t),0===o?0:1/(o*o),0===a?0:1/(a*a)),this._minimumRadius=Math.min(t,o,a),this._maximumRadius=Math.max(t,o,a),this._centerToleranceSquared=i.EPSILON1};a.fromCartesian3=function(t){return t===void 0?new a:new a(t.x,t.y,t.z)},a.WGS84=t(new a(6378137,6378137,6356752.314245179)),a.UNIT_SPHERE=t(new a(1,1,1)),a.prototype.getRadii=function(){return this._radii},a.prototype.getRadiiSquared=function(){return this._radiiSquared},a.prototype.getRadiiToTheFourth=function(){return this._radiiToTheFourth},a.prototype.getOneOverRadii=function(){return this._oneOverRadii},a.prototype.getOneOverRadiiSquared=function(){return this._oneOverRadiiSquared},a.prototype.getMinimumRadius=function(){return this._minimumRadius},a.prototype.getMaximumRadius=function(){return this._maximumRadius},a.prototype.geocentricSurfaceNormal=n.normalize,a.prototype.geodeticSurfaceNormalCartographic=function(t,e){if(t===void 0)throw new r("cartographic is required.");var i=t.longitude,o=t.latitude,a=Math.cos(o),u=a*Math.cos(i),s=a*Math.sin(i),h=Math.sin(o);return e===void 0&&(e=new n),e.x=u,e.y=s,e.z=h,n.normalize(e,e)},a.prototype.geodeticSurfaceNormal=function(t,e){return e=n.multiplyComponents(t,this._oneOverRadiiSquared,e),n.normalize(e,e)};var u=new n,s=new n;a.prototype.cartographicToCartesian=function(t,e){var r=u,i=s;this.geodeticSurfaceNormalCartographic(t,r),n.multiplyComponents(this._radiiSquared,r,i);var o=Math.sqrt(n.dot(r,i));return n.divideByScalar(i,o,i),n.multiplyByScalar(r,t.height,r),n.add(i,r,e)},a.prototype.cartographicArrayToCartesianArray=function(t,e){if(t===void 0)throw new r("cartographics is required.");var i=t.length;e===void 0?e=Array(i):e.length=i;for(var n=0;i>n;n++)e[n]=this.cartographicToCartesian(t[n],e[n]);return e};var h=new n,d=new n,c=new n;a.prototype.cartesianToCartographic=function(t,e){var r=this.scaleToGeodeticSurface(t,d);if(r===void 0)return void 0;var a=this.geodeticSurfaceNormal(r,h),u=n.subtract(t,r,c),s=Math.atan2(a.y,a.x),f=Math.asin(a.z),l=i.sign(n.dot(u,t))*n.magnitude(u);return e===void 0?new o(s,f,l):(e.longitude=s,e.latitude=f,e.height=l,e)},a.prototype.cartesianArrayToCartographicArray=function(t,e){if(t===void 0)throw new r("cartesians is required.");var i=t.length;e===void 0?e=Array(i):e.length=i;for(var n=0;i>n;++n)e[n]=this.cartesianToCartographic(t[n],e[n]);return e};var f,l=new n;return a.prototype.scaleToGeodeticSurface=function(t,e){if(t===void 0)throw new r("cartesian is required.");var o=t.x,a=t.y,u=t.z,s=this._oneOverRadii,h=s.x,d=s.y,c=s.z,p=o*o*h*h,w=a*a*d*d,v=u*u*c*c,y=p+w+v,E=Math.sqrt(1/y),m=n.multiplyByScalar(t,E,f);if(this._centerToleranceSquared>y)return isFinite(E)?n.clone(m,e):void 0;var g=this._oneOverRadiiSquared,T=g.x,S=g.y,I=g.z,O=l;O.x=2*m.x*T,O.y=2*m.y*S,O.z=2*m.z*I;var _,x,P,N,R,M,q,z,b,A,C,L=(1-E)*n.magnitude(t)/(.5*n.magnitude(O)),B=0;do{L-=B,P=1/(1+L*T),N=1/(1+L*S),R=1/(1+L*I),M=P*P,q=N*N,z=R*R,b=M*P,A=q*N,C=z*R,_=p*M+w*q+v*z-1,x=p*b*T+w*A*S+v*C*I;var D=-2*x;B=_/D}while(Math.abs(_)>i.EPSILON12);return e===void 0?new n(o*P,a*N,u*R):(e.x=o*P,e.y=a*N,e.z=u*R,e)},a.prototype.scaleToGeocentricSurface=function(t,e){if(t===void 0)throw new r("cartesian is required.");var i=t.x,o=t.y,a=t.z,u=this._oneOverRadiiSquared,s=1/Math.sqrt(i*i*u.x+o*o*u.y+a*a*u.z);return n.multiplyByScalar(t,s,e)},a.prototype.transformPositionToScaledSpace=function(t,e){return n.multiplyComponents(t,this._oneOverRadii,e)},a.prototype.equals=function(t){return this===t||t!==void 0&&n.equals(this._radii,t._radii)},a.prototype.toString=function(){return""+this._radii},a}),define("Core/Extent",["./freezeObject","./defaultValue","./Ellipsoid","./Cartographic","./DeveloperError","./Math"],function(t,e,r,i,n,o){var a=function(t,r,i,n){this.west=e(t,0),this.south=e(r,0),this.east=e(i,0),this.north=e(n,0)};a.prototype.clone=function(t){return t===void 0?new a(this.west,this.south,this.east,this.north):(t.west=this.west,t.south=this.south,t.east=this.east,t.north=this.north,t)},a.prototype.equals=function(t){return t!==void 0&&this.west===t.west&&this.south===t.south&&this.east===t.east&&this.north===t.north},a.prototype.equalsEpsilon=function(t,e){if("number"!=typeof e)throw new n("epsilon is required and must be a number.");return t!==void 0&&e>=Math.abs(this.west-t.west)&&e>=Math.abs(this.south-t.south)&&e>=Math.abs(this.east-t.east)&&e>=Math.abs(this.north-t.north)},a.prototype.validate=function(){var t=this.north;if("number"!=typeof t)throw new n("north is required to be a number.");if(-o.PI_OVER_TWO>t||t>o.PI_OVER_TWO)throw new n("north must be in the interval [-Pi/2, Pi/2].");var e=this.south;if("number"!=typeof e)throw new n("south is required to be a number.");if(-o.PI_OVER_TWO>e||e>o.PI_OVER_TWO)throw new n("south must be in the interval [-Pi/2, Pi/2].");var r=this.west;if("number"!=typeof r)throw new n("west is required to be a number.");if(-Math.PI>r||r>Math.PI)throw new n("west must be in the interval [-Pi, Pi].");var i=this.east;if("number"!=typeof i)throw new n("east is required to be a number.");if(-Math.PI>i||i>Math.PI)throw new n("east must be in the interval [-Pi, Pi].")},a.prototype.getSouthwest=function(t){return t===void 0?new i(this.west,this.south):(t.longitude=this.west,t.latitude=this.south,t.height=0,t)},a.prototype.getNorthwest=function(t){return t===void 0?new i(this.west,this.north):(t.longitude=this.west,t.latitude=this.north,t.height=0,t)},a.prototype.getNortheast=function(t){return t===void 0?new i(this.east,this.north):(t.longitude=this.east,t.latitude=this.north,t.height=0,t)},a.prototype.getSoutheast=function(t){return t===void 0?new i(this.east,this.south):(t.longitude=this.east,t.latitude=this.south,t.height=0,t)},a.prototype.getCenter=function(t){return t===void 0?new i(.5*(this.west+this.east),.5*(this.south+this.north)):(t.longitude=.5*(this.west+this.east),t.latitude=.5*(this.south+this.north),t.height=0,t)},a.prototype.intersectWith=function(t,e){if(t===void 0)throw new n("otherExtent is required.");var r=Math.max(this.west,t.west),i=Math.max(this.south,t.south),o=Math.min(this.east,t.east),u=Math.min(this.north,t.north);return e===void 0?new a(r,i,o,u):(e.west=r,e.south=i,e.east=o,e.north=u,e)},a.prototype.contains=function(t){if(t===void 0)throw new n("cartographic is required.");return t.longitude>=this.west&&this.east>=t.longitude&&t.latitude>=this.south&&this.north>=t.latitude},a.prototype.isEmpty=function(){return this.west===this.east&&this.south===this.north};var u=new i;return a.prototype.subsample=function(t,i){t=e(t,r.WGS84),i===void 0&&(i=[]);var n=0,a=this.north,s=this.south,h=this.east,d=this.west,c=u;c.longitude=d,c.latitude=a,i[n]=t.cartographicToCartesian(c,i[n]),n++,c.longitude=h,i[n]=t.cartographicToCartesian(c,i[n]),n++,c.latitude=s,i[n]=t.cartographicToCartesian(c,i[n]),n++,c.longitude=d,i[n]=t.cartographicToCartesian(c,i[n]),n++,c.latitude=0>a?a:s>0?s:0;for(var f=1;8>f;++f){var l=-Math.PI+f*o.PI_OVER_TWO;l>d&&h>l&&(c.longitude=l,i[n]=t.cartographicToCartesian(c,i[n]),n++)}return 0===c.latitude&&(c.longitude=d,i[n]=t.cartographicToCartesian(c,i[n]),n++,c.longitude=h,i[n]=t.cartographicToCartesian(c,i[n]),n++),i.length=n,i},a.MAX_VALUE=t(new a(-Math.PI,-o.PI_OVER_TWO,Math.PI,o.PI_OVER_TWO)),a}),define("Core/Enumeration",[],function(){var t=function(t,e,r){if(this.value=t,this.name=e,r!==void 0)for(var i in r)r.hasOwnProperty(i)&&(this[i]=r[i])};return t.prototype.valueOf=function(){return this.value},t.prototype.toString=function(){return this.name},t}),define("Core/ComponentDatatype",["./Enumeration"],function(t){if("undefined"==typeof Int8Array)return{};var e={};return e.BYTE=new t(5120,"BYTE"),e.BYTE.sizeInBytes=Int8Array.BYTES_PER_ELEMENT,e.BYTE.toTypedArray=function(t){return new Int8Array(t)},e.BYTE.createArrayBufferView=function(t,e){return new Int8Array(t,e)},e.UNSIGNED_BYTE=new t(5121,"UNSIGNED_BYTE"),e.UNSIGNED_BYTE.sizeInBytes=Uint8Array.BYTES_PER_ELEMENT,e.UNSIGNED_BYTE.toTypedArray=function(t){return new Uint8Array(t)},e.UNSIGNED_BYTE.createArrayBufferView=function(t,e){return new Uint8Array(t,e)},e.SHORT=new t(5122,"SHORT"),e.SHORT.sizeInBytes=Int16Array.BYTES_PER_ELEMENT,e.SHORT.toTypedArray=function(t){return new Int16Array(t)},e.SHORT.createArrayBufferView=function(t,e){return new Int16Array(t,e)},e.UNSIGNED_SHORT=new t(5123,"UNSIGNED_SHORT"),e.UNSIGNED_SHORT.sizeInBytes=Uint16Array.BYTES_PER_ELEMENT,e.UNSIGNED_SHORT.toTypedArray=function(t){return new Uint16Array(t)},e.UNSIGNED_SHORT.createArrayBufferView=function(t,e){return new Uint16Array(t,e)},e.FLOAT=new t(5126,"FLOAT"),e.FLOAT.sizeInBytes=Float32Array.BYTES_PER_ELEMENT,e.FLOAT.toTypedArray=function(t){return new Float32Array(t)},e.FLOAT.createArrayBufferView=function(t,e){return new Float32Array(t,e)},e.validate=function(t){return t===e.BYTE||t===e.UNSIGNED_BYTE||t===e.SHORT||t===e.UNSIGNED_SHORT||t===e.FLOAT},e}),define("Core/PrimitiveType",["./Enumeration"],function(t){var e={POINTS:new t(0,"POINTS"),LINES:new t(1,"LINES"),LINE_LOOP:new t(2,"LINE_LOOP"),LINE_STRIP:new t(3,"LINE_STRIP"),TRIANGLES:new t(4,"TRIANGLES"),TRIANGLE_STRIP:new t(5,"TRIANGLE_STRIP"),TRIANGLE_FAN:new t(6,"TRIANGLE_FAN"),validate:function(t){return t===e.POINTS||t===e.LINES||t===e.LINE_LOOP||t===e.LINE_STRIP||t===e.TRIANGLES||t===e.TRIANGLE_STRIP||t===e.TRIANGLE_FAN}};return e}),define("Core/ExtentTessellator",["./defaultValue","./DeveloperError","./Math","./Ellipsoid","./Extent","./Cartesian3","./ComponentDatatype","./PrimitiveType"],function(t,e,r,i,n,o,a,u){var s={};return s.computeVertices=function(e){e=t(e,{});for(var r=e.extent,i=e.surfaceHeight,n=e.width,o=e.height,a=(r.east-r.west)/(n-1),u=(r.north-r.south)/(o-1),s=e.generateTextureCoordinates,h=e.interleaveTextureCoordinates,d=e.relativeToCenter,c=e.vertices,f=e.textureCoordinates,l=e.indices,p=e.radiiSquared,w=p.x,v=p.y,y=p.z,E=Math.cos,m=Math.sin,g=Math.sqrt,T=1/(r.east-r.west),S=1/(r.north-r.south),I=0,O=0,_=0;o>_;++_)for(var x=r.north-u*_,P=E(x),N=m(x),R=y*N,M=(x-r.south)*S,q=M,z=0;n>z;++z){var b=r.west+a*z,A=P*E(b),C=P*m(b),L=w*A,B=v*C,D=g(L*A+B*C+R*N),G=L/D,V=B/D,U=R/D;if(c[I++]=G+A*i-d.x,c[I++]=V+C*i-d.y,c[I++]=U+N*i-d.z,s){var W=(b-r.west)*T,F=W;h?(c[I++]=F,c[I++]=q):(f[O++]=F,f[O++]=q)}}if(l!==void 0)for(var H=0,Y=0,k=0;o-1>k;++k){for(var Z=0;n-1>Z;++Z){var j=H,X=j+n,J=X+1,K=j+1;l[Y++]=j,l[Y++]=X,l[Y++]=K,l[Y++]=K,l[Y++]=X,l[Y++]=J,++H}++H}},s.compute=function(e){e=t(e,{});var r=e.extent;r.validate();var n=t(e.ellipsoid,i.WGS84);e.radiiSquared=n.getRadiiSquared(),e.relativeToCenter=t(e.relativeToCenter,o.ZERO);var h=t(e.granularity,.1);e.surfaceHeight=t(e.surfaceHeight,0),e.width=Math.ceil((r.east-r.west)/h)+1,e.height=Math.ceil((r.north-r.south)/h)+1;var d=[],c=[],f=[];e.generateTextureCoordinates=t(e.generateTextureCoordinates,!1),e.interleaveTextureCoordinates=!1,e.vertices=d,e.textureCoordinates=f,e.indices=c,s.computeVertices(e);var l={attributes:{},indexLists:[{primitiveType:u.TRIANGLES,values:c}]},p=t(e.positionName,"position");if(l.attributes[p]={componentDatatype:a.FLOAT,componentsPerAttribute:3,values:d},e.generateTextureCoordinates){var w=t(e.textureCoordinatesName,"textureCoordinates");l.attributes[w]={componentDatatype:a.FLOAT,componentsPerAttribute:2,values:f}}return l},s.computeBuffers=function(e){e=t(e,{});var r=e.extent;r.validate();var n=t(e.ellipsoid,i.WGS84);e.radiiSquared=n.getRadiiSquared(),e.relativeToCenter=t(e.relativeToCenter,o.ZERO);var a=t(e.granularity,.1);e.surfaceHeight=t(e.surfaceHeight,0),e.width=Math.ceil((r.east-r.west)/a)+1,e.height=Math.ceil((r.north-r.south)/a)+1;var u=[],h=[],d=[];e.generateTextureCoordinates=t(e.generateTextureCoordinates,!1),e.interleaveTextureCoordinates=t(e.interleaveTextureCoordinates,!1),e.vertices=u,e.textureCoordinates=d,e.indices=h,s.computeVertices(e);var c={indices:h};return e.interleaveTextureCoordinates?c.vertices=u:(c.positions=u,e.generateTextureCoordinates&&(c.textureCoordinates=d)),c},s}),define("Workers/createTaskProcessorWorker",[],function(){var t=function(t){var e,r=[],i={id:void 0,result:void 0};return function(n){var o=n.data;i.id=o.id,r.length=0,i.result=t(o.parameters,r),e===void 0&&(e=self.webkitPostMessage!==void 0?self.webkitPostMessage:self.postMessage),e(i,r)}};return t}),define("Workers/createVerticesFromExtent",["../Core/ExtentTessellator","./createTaskProcessorWorker"],function(t,e){function r(e,r){var i=new Float32Array(5*e.width*e.height);return r.push(i.buffer),e.vertices=i,e.generateTextureCoordinates=!0,e.interleaveTextureCoordinates=!0,t.computeVertices(e),i.buffer}return e(r)});