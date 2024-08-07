const canvasSketch = require('canvas-sketch')
const createShader = require('canvas-sketch-util/shader')
const glsl = require('glslify')

// Setup our sketch
const settings = {
    context: 'webgl',
    animate: false,
}

// Your glsl code
const frag = glsl(/*glsl*/ `
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    vec3 colorA = vec3(1, 1, 0);
    vec3 colorB = vec3(0, 1, .8);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float distance = length(center);

    // Mix colors from one vector to another based on the 2vector reference
    vec3 color = mix(colorA, colorB, vUv.y);
    // set a ternary to fill the alpha channel with full or null opacity
    gl_FragColor = vec4(color, distance > 0.15 ? 0.0 : 1.0 );
  }
`)

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
    // Create the shader and return it
    return createShader({
        // Pass along WebGL context
        gl,
        // Specify fragment and/or vertex shader strings
        frag,
        // Specify additional uniforms to pass down to the shaders
        uniforms: {
            // Expose props from canvas-sketch
            time: ({ time }) => time * 0.1,
            aspect: ({ width, height }) => width / height,
        },
    })
}

canvasSketch(sketch, settings)
