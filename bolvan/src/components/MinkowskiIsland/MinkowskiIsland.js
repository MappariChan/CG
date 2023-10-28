import { useRef, useEffect } from "react";

import classes from "./MinkowskiIsland.module.css";

const bgColor1 = "#F3D6BF";
const bgColor2 = "#73777F";
const bgColor3 = "#303B51";

function drawPage(context, width, height, iterations) {
  context.clearRect(0, 0, width, height);
  context.setTransform(1, 0, 0, 1, 0, 0);

  const objectHeight = (Math.min(height, width) * 3) / 6;

  const p0 = {
      x: (width - objectHeight) / 2,
      y: (height - objectHeight) / 2 + objectHeight,
    },
    p1 = {
      x: p0.x,
      y: p0.y - objectHeight,
    },
    p2 = {
      x: p1.x + objectHeight,
      y: p1.y,
    },
    p3 = {
      x: p2.x,
      y: p2.y + objectHeight,
    };

  function bgFill(bgColor1, bgColor2, bgColor3) {
    context.translate(width / 2, height / 2);

    const bgGrd = context.createRadialGradient(0, 0, 50, 0, 0, 700);
    bgGrd.addColorStop(0, bgColor1);
    bgGrd.addColorStop(0.5, bgColor2);
    bgGrd.addColorStop(1, bgColor3);

    context.fillStyle = bgGrd;
    context.fillRect(-width / 2, -height / 2, width, height);
  }

  bgFill(bgColor1, bgColor2, bgColor3);

  context.translate(-width / 2, -height / 2);

  koch(p0, p1, iterations);
  koch(p1, p2, iterations);
  koch(p2, p3, iterations);
  koch(p3, p0, iterations);

  function koch(p0, p1, limit) {
    context.strokeStyle = "#F7F0DF";

    var dx = p1.x - p0.x,
      dy = p1.y - p0.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      unit = dist / 4,
      angle = Math.atan2(dy, dx),
      pA = {
        x: p0.x + dx / 4,
        y: p0.y + dy / 4,
      },
      pB = {
        x: pA.x + Math.cos(angle - Math.PI / 2) * unit,
        y: pA.y + Math.sin(angle - Math.PI / 2) * unit,
      },
      pC = {
        x: pB.x + Math.cos(angle) * unit,
        y: pB.y + Math.sin(angle) * unit,
      },
      pD = {
        x: pC.x + Math.cos(angle + Math.PI / 2) * unit,
        y: pC.y + Math.sin(angle + Math.PI / 2) * unit,
      },
      pE = {
        x: pD.x + Math.cos(angle + Math.PI / 2) * unit,
        y: pD.y + Math.sin(angle + Math.PI / 2) * unit,
      },
      pF = {
        x: pE.x + Math.cos(angle) * unit,
        y: pE.y + Math.sin(angle) * unit,
      },
      pG = {
        x: pF.x + Math.cos(angle - Math.PI / 2) * unit,
        y: pF.y + Math.sin(angle - Math.PI / 2) * unit,
      },
      pH = {
        x: p1.x - dx / 4,
        y: p1.y - dy / 4,
      };

    if (limit > 0) {
      koch(p0, pA, limit - 1);
      koch(pA, pB, limit - 1);
      koch(pB, pC, limit - 1);
      koch(pC, pD, limit - 1);
      koch(pD, pE, limit - 1);
      koch(pE, pF, limit - 1);
      koch(pF, pG, limit - 1);
      koch(pG, pH, limit - 1);
      koch(pG, p1, limit - 1);
    } else if (limit < 0) {
      context.beginPath();
      context.moveTo(p0.x, p0.y);
      context.lineTo(p1.x, p1.y);
      context.stroke();
    } else {
      context.beginPath();
      context.moveTo(p0.x, p0.y);
      context.lineTo(pA.x, pA.y);
      context.lineTo(pB.x, pB.y);
      context.lineTo(pC.x, pC.y);
      context.lineTo(pD.x, pD.y);
      context.lineTo(pE.x, pE.y);
      context.lineTo(pF.x, pF.y);
      context.lineTo(pG.x, pG.y);
      context.lineTo(p1.x, p1.y);
      context.stroke();
    }
  }
}

const MinkowskiIsland = ({ iterations }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Get the width and height of the canvas
    const width = canvas.clientWidth * devicePixelRatio;
    const height = canvas.clientHeight * devicePixelRatio;

    // Set the canvas resolution to be high DPI
    canvas.width = width;
    canvas.height = height;

    drawPage(ctx, width, height, iterations);
  }, [iterations]);

  return <canvas className={classes.canvas} ref={canvasRef} />;
};

export default MinkowskiIsland;
