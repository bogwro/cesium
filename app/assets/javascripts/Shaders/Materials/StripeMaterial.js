// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "uniform vec4 lightColor;\n\
uniform vec4 darkColor;\n\
uniform float offset;\n\
uniform float repeat;\n\
uniform bool horizontal;\n\
\n\
czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
\n\
    // Based on the Stripes Fragment Shader in the Orange Book (11.1.2)\n\
    // Fuzz Factor - Controls blurriness between light and dark colors\n\
    const float fuzz = 0.1;\n\
\n\
    float coord = mix(materialInput.st.s, materialInput.st.t, float(horizontal));\n\
    float value = fract((coord - offset) * (repeat * 0.5));\n\
    \n\
    //anti-aliasing\n\
    float val1 = clamp(value / fuzz, 0.0, 1.0);\n\
    float val2 = clamp((value - 0.5) / fuzz, 0.0, 1.0);\n\
    val1 = val1 * (1.0 - val2);\n\
    val1 = val1 * val1 * (3.0 - (2.0 * val1));\n\
\n\
    vec4 color = mix(lightColor, darkColor, val1);\n\
    material.diffuse = color.rgb;\n\
    material.alpha = color.a;\n\
    \n\
    return material;\n\
}\n\
";
});