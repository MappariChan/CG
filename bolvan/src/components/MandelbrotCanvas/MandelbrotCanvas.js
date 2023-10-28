import React from "react";
import { useRef, useEffect, useState } from "react";

import classes from "./MandelbrotCanvas.module.css";

//TODO: запхай power - степінь  зетки через проп
//! пропи width i height мають бути однаковими
const MandelbrotCanvas = (props) => {
  const canvasRef = useRef(null);
  let canvas;
  const REAL_SET = { start: -2, end: 1 };
  const IMAGINARY_SET = { start: -1, end: 1 };

  useEffect(() => {
    canvas = {
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    };
  }, []);

  const config = {
    iterationsCount: 100,
  };

  class ComplexNumber {
    constructor(r, i) {
      this.r = r;
      this.i = i;
    }

    mag() {
      return Math.hypot(this.r, this.i);
    }

    add(nmb) {
      this.r += nmb.r;
      this.i += nmb.i;
      return this;
    }

    power(n) {
      let r = this.r;
      let i = this.i;

      const rea = Math.sqrt(r * r + i * i);
      const theta = Math.atan2(i, r);

      const newR = Math.pow(rea, n);
      const newTheta = theta * n;

      this.r = newR * Math.cos(newTheta);
      this.i = newR * Math.sin(newTheta);
      //   this.r = (r * r) - (i * i);
      //   this.i = 2 * r * i;
      //   this.r = Math.pow(r, 5) - 10 * Math.pow(r, 3) * Math.pow(i, 2);
      //   this.i = 5 * Math.pow(r, 4) * i - 10 * Math.pow(r, 2) * Math.pow(i, 3);
      //   this.r = Math.pow(r, 4) - 6 * Math.pow(r, 2) * Math.pow(i, 2)
      //   this.i = 4 * r * Math.pow(i, 3) - Math.pow(i, 4)
      return this;
    }
  }

  const drawFractal = function (ctx) {
    ctx.translate(0, -(canvas.width - canvas.height) / 2);
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        let a = (x - canvas.width / 2) / (canvas.width / 3);
        let b = (y - canvas.height / 2) / (canvas.height / 3);
        // let a = x - canvas.width / 2;
        // let b = y - canvas.height / 2;

        let z = new ComplexNumber(0, 0);
        let c = new ComplexNumber(a, b);

        let color = "rgb(0, 0, 0, 1)";
        for (let i = 0; i < config.iterationsCount; i++) {
          z.power(props.power).add(c);

          if (z.mag() > 2) {
            color =
              "rgb(0, 0, " + (225 * (i / config.iterationsCount) + 45) + ", 1)";
            break;
          }
        }
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawFractal(ctx);
  }, [props.power]);

  return <canvas className={classes.canvas} ref={canvasRef} {...props} />;
};

export default MandelbrotCanvas;
