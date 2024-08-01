const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const colorCount = 3;
  const palette = random.pick(palettes).slice(0, colorCount)

  const createGrid = () => {
    
    const points = [];
    const count = 50;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          color: random.pick(palette),
          radius: Math.abs(random.gaussian() * 0.01),
          position: [u, v]
        });
      }
    }
    return points;
  }

  // setting a determined seed to keep the same randomness everytime we refresh
  // or if we want to sync it with other generative art.
  random.setSeed(312);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;



  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach(dataEntry => {
      const { position, radius, color } = dataEntry;
      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u); 
      const y = lerp(margin, width - margin, v);

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();

    });



  };
};

canvasSketch(sketch, settings);
