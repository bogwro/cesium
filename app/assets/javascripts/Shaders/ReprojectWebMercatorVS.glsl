attribute vec4 position;

uniform vec2 u_textureDimensions;

varying vec2 v_textureCoordinates;

void main()
{
    v_textureCoordinates = position.xy;
    gl_Position = czm_viewportOrthographic * (position * vec4(u_textureDimensions, 1.0, 1.0));
}
