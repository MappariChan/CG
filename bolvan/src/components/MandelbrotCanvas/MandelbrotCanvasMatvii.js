import { useEffect, useRef, useState } from "react";

import classes from "./MandelbrotCanvas.module.css";

const MAX_ITERATION = 80;

function complexPower(real, imag, n) {
  // Calculate the modulus (magnitude) and argument (angle)
  const r = Math.sqrt(real ** 2 + imag ** 2);
  const theta = Math.atan2(imag, real);

  // Calculate the new modulus and argument after raising to the power of n
  const newR = r ** n;
  const newTheta = n * theta;

  // Calculate the real and imaginary parts of the result
  const newReal = newR * Math.cos(newTheta);
  const newImag = newR * Math.sin(newTheta);

  return { real: newReal, imag: newImag };
}

function mandelbrot(c, power) {
  let z = { x: 0, y: 0 },
    n = 0,
    p,
    d;
  do {
    let complex = complexPower(z.x, z.y, power);
    p = {
      x: complex.real,
      y: complex.imag,
    };
    z = {
      x: p.x + c.x,
      y: p.y + c.y,
    };
    d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
    n += 1;
  } while (d <= 2 && n < MAX_ITERATION);
  return [n, d <= 2];
}

const MandelbrotCanvasMatvii = ({ power }) => {
  const [scale, setScale] = useState({
    x: { start: -2, end: 2 },
    y: { start: -2, end: 2 },
  });
  var canvasRef = useRef();
  let ctx;

  let WIDTH;
  let HEIGHT;

  useEffect(() => {
    var canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Get the width and height of the canvas
    WIDTH = canvas.clientWidth * devicePixelRatio;
    HEIGHT = canvas.clientHeight * devicePixelRatio;

    // Set the canvas resolution to be high DPI
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    draw(power);
  }, [scale, power]);

  //   const REAL_SET = { start: -2, end: 2 };
  //   const IMAGINARY_SET = { start: -2, end: 2 };

  const colors = new Array(16)
    .fill(0)
    .map((_, i) =>
      i === 0 ? "#000" : `#${(((1 << 24) * Math.random()) | 0).toString(16)}`
    );

  function draw(power) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < WIDTH; i++) {
      for (let j = 0; j < HEIGHT; j++) {
        let complex = {
          x: scale.x.start + (i / WIDTH) * (scale.x.end - scale.x.start),
          y: scale.y.start + (j / HEIGHT) * (scale.y.end - scale.y.start),
        };

        const [m, isMandelbrotSet] = mandelbrot(complex, power);
        ctx.fillStyle =
          colors[isMandelbrotSet ? 0 : (m % colors.length) - 1 + 1];
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }

  const mouseWheelHandler = (event) => {
    const elementRect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - elementRect.left;
    const mouseY = event.clientY - elementRect.top;
    setScale((prev) => {
      let scaleLength = prev.x.end - prev.x.start;
      let newScaleLength = scaleLength * Math.pow(2, event.deltaY / 100);
      console.log(newScaleLength);
      let newCenterX =
        prev.x.start + (mouseX / canvasRef.current.clientWidth) * scaleLength;
      let newCenterY =
        prev.y.start + (mouseY / canvasRef.current.clientHeight) * scaleLength;
      console.log({
        x: {
          start: newCenterX - newScaleLength / 2,
          end: newCenterX + newScaleLength / 2,
        },
        y: {
          start: newCenterY - newScaleLength / 2,
          end: newCenterY + newScaleLength / 2,
        },
      });
      return {
        x: {
          start: newCenterX - newScaleLength / 2,
          end: newCenterX + newScaleLength / 2,
        },
        y: {
          start: newCenterY - newScaleLength / 2,
          end: newCenterY + newScaleLength / 2,
        },
      };
    });
    console.log(event.deltaY);
  };

  return (
    <canvas
      className={classes.canvas}
      ref={canvasRef}
      onWheel={mouseWheelHandler}
    />
  );
};

export default MandelbrotCanvasMatvii;
