    //This file is automatically rebuilt by the Cesium build process.
    /*global define*/
    define(function() {
    "use strict";
    return "uniform sampler2D u_texture;\n\
varying vec2 v_textureCoordinates;\n\
void main()\n\
{\n\
gl_FragColor = texture2D(u_texture, v_textureCoordinates);\n\
}\n\
";
});