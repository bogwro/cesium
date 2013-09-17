    //This file is automatically rebuilt by the Cesium build process.
    /*global define*/
    define(function() {
    "use strict";
    return "varying vec2 v_st;\n\
void main()\n\
{\n\
czm_materialInput materialInput;\n\
materialInput.s = v_st.s;\n\
materialInput.st = v_st;\n\
materialInput.str = vec3(v_st, 0.0);\n\
czm_material material = czm_getMaterial(materialInput);\n\
gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n\
}\n\
";
});