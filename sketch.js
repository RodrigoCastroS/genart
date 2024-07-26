const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'orange';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width/2, height/2, 300, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();

    context.lineWidth = "10";
    context.strokeStyle = "darkblue";
    context.stroke();

    context.beginPath();
    context.arc(width/2, height/6.5, 100, 0, Math.PI * 2, false);
    context.fillStyle = "green";
    context.fill();


  };
};

canvasSketch(sketch, settings);
