const canvasSketch = require('canvas-sketch')
const createShader = require('canvas-sketch-util/shader')
const glsl = require('glslify')

// Setup our sketch
const settings = {
    context: 'webgl',
    animate: true,
}

// Your glsl code
const frag = glsl(/*glsl*/ `
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    vec3 colorA = sin(time) + vec3(0.2, 0.8, 0.0);
    vec3 colorB = vec3(0.0, 0.9, 0.9);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float distance = length(center);
    
    // the closer the steps, the sharper the edges are going to be
    float alpha = smoothstep(0.25777, 0.25, distance);

    // Mix colors from one vector to another based on the 2vector reference
    vec3 color = mix(colorA, colorB, cos(vUv.y) + vUv.x * sin(time)); // Include time variation to move the gradient
    
    // set a ternary to fill the alpha channe  l with full or null opacity
    gl_FragColor = vec4(color, alpha);
  }
`)

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
    // Create the shader and return it
    return createShader({
        // set a bg color
        clearColor: 'white',
        // Pass along WebGL context
        gl,
        // Specify fragment and/or vertex shader strings
        frag,
        // Specify additional uniforms to pass down to the shaders
        uniforms: {
            // Expose props from canvas-sketch
            time: ({ time }) => time * 0.8,
            aspect: ({ width, height }) => width / height,
        },
    })
}

canvasSketch(sketch, settings)
