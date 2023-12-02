import { useState, useRef, useEffect } from "react";
import DragWrapper from "../UI/DragWrapper";
import OptionList from "../components/OptionList/OptionList";

import classes from "./ColorSchemesPage.module.css";

const ColorSchemesPage = () => {
  const [image, setImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topLeftCornerOfSelectedBox, setTopLeftCornerOfSelectedBox] =
    useState(null);
  const [
    topLeftCanvasCornerOfSelectedBox,
    setTopLeftCanvasCornerOfSelectedBox,
  ] = useState({ x: 0, y: 0 });
  const [bottomRightCornerOfSelectedBox, setBottomRightCornerOfSelectedBox] =
    useState(null);
  const [
    bottomRightCanvasCornerOfSelectedBox,
    setBottomRightCanvasCornerOfSelectedBox,
  ] = useState({ x: 0, y: 0 });
  const [isMouseHeld, setMouseHeld] = useState(false);
  const canvasRef = useRef();

  const [brightness, setBrightness] = useState(1);
  const [bitMapData, setBitMapData] = useState([]);
  const [RGB, setRGB] = useState({ r: 0, g: 0, b: 0 });
  const [XYZ, setXYZ] = useState({ x: 0, y: 0, z: 0 });

  const options = [
    {
      title: "brightness",
      value: brightness,
      setValue: setBrightness,
      type: "range",
      min: 0,
      max: 2,
      step: 0.01,
    },
  ];

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const myImage = new Image();
        myImage.src = e.target.result;

        myImage.onload = function () {
          setIsLoaded(true);
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          canvas.width = myImage.naturalWidth;
          canvas.height = myImage.naturalHeight;

          setBottomRightCanvasCornerOfSelectedBox({
            x: canvas.width,
            y: canvas.height,
          });

          ctx.drawImage(myImage, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          setBitMapData(imageData.data);
        };
      };

      reader.readAsDataURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const x = topLeftCanvasCornerOfSelectedBox.x;
      const y = topLeftCanvasCornerOfSelectedBox.y;
      const width = bottomRightCanvasCornerOfSelectedBox.x - x;
      const height = bottomRightCanvasCornerOfSelectedBox.y - y;
      const imageData = ctx.getImageData(x, y, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Modify the RGB values (assuming no alpha channel for simplicity)
        data[i] = bitMapData[i] * brightness; // Red
        data[i + 1] = bitMapData[i + 1] * brightness; // Green
        data[i + 2] = bitMapData[i + 2] * brightness; // Blue
      }
      ctx.putImageData(imageData, x, y);
    }
  }, [brightness]);

  const mouseDownHandler = (event) => {
    setMouseHeld(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const canvasX = Math.round((event.clientX - rect.left) * scaleX);
    const canvasY = Math.round((event.clientY - rect.top) * scaleY);

    setBottomRightCornerOfSelectedBox(null);
    setBottomRightCanvasCornerOfSelectedBox(null);
    setTopLeftCornerOfSelectedBox({ x: x, y: y });
    setTopLeftCanvasCornerOfSelectedBox({ x: canvasX, y: canvasY });

    console.log(x + "; " + y);
  };

  const clickHandler = (event) => {
    setMouseHeld(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = topLeftCanvasCornerOfSelectedBox.x;
    const y = topLeftCanvasCornerOfSelectedBox.y;
    const width = bottomRightCanvasCornerOfSelectedBox.x - x;
    const height = bottomRightCanvasCornerOfSelectedBox.y - y;
    const imageData = ctx.getImageData(x, y, width, height);
    setBitMapData(imageData.data);
  };

  const mouseMoveHandler = (event) => {
    if (isLoaded) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      const canvasX = Math.round((event.clientX - rect.left) * scaleX);
      const canvasY = Math.round((event.clientY - rect.top) * scaleY);
      console.log(canvasX, canvasY);
      if (isMouseHeld) {
        setBottomRightCornerOfSelectedBox({ x: clientX, y: clientY });
        setBottomRightCanvasCornerOfSelectedBox({ x: canvasX, y: canvasY });
      }
      const ctx = canvas.getContext("2d");
      const pixelData = ctx.getImageData(canvasX, canvasY, 5, 5).data;
      var r = pixelData[0];
      var g = pixelData[1];
      var b = pixelData[2];
      console.log(r, g, b);
      setRGB({ r: r, g: g, b: b });
      setXYZ(rgbToXyz({ r, g, b }));
    }
  };

  function rgbToXyz(rgb) {
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    if (r > 0.04045) {
      r = Math.pow((r + 0.055) / 1.055, 2.4);
    } else {
      r = r / 12.92;
    }

    if (g > 0.04045) {
      g = Math.pow((g + 0.055) / 1.055, 2.4);
    } else {
      g = g / 12.92;
    }

    if (b > 0.04045) {
      b = Math.pow((b + 0.055) / 1.055, 2.4);
    } else {
      b = b / 12.92;
    }

    r *= 100;
    g *= 100;
    b *= 100;

    // Observer = 2°, Illuminant = D65
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    return { x, y, z };
  }

  function exportHandler() {
    var canvas = canvasRef.current;
    var dataUrl = canvas.toDataURL("image/png"); // 'image/png' for PNG format, use 'image/jpeg' for JPEG

    // Create a temporary link and trigger a download
    var a = document.createElement("a");
    a.href = dataUrl;
    a.download = "canvas_image.png"; // Specify the filename with the desired extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className={classes.container}>
      <DragWrapper
        setData={setImage}
        className={classes["drag-wrapper"]}
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
      >
        {!isLoaded && <span>Drop your file here</span>}
        <canvas
          ref={canvasRef}
          className={`${classes.image} ${isLoaded ? "" : classes.hidden}`}
        />
        {topLeftCornerOfSelectedBox != null &&
          bottomRightCornerOfSelectedBox != null && (
            <div
              className={classes["selected-box"]}
              style={{
                top: topLeftCornerOfSelectedBox.y,
                left: topLeftCornerOfSelectedBox.x,
                width:
                  bottomRightCornerOfSelectedBox.x -
                  topLeftCornerOfSelectedBox.x +
                  "px",
                height:
                  bottomRightCornerOfSelectedBox.y -
                  topLeftCornerOfSelectedBox.y +
                  "px",
              }}
            ></div>
          )}
      </DragWrapper>
      <div className={classes["side-panel"]}>
        <OptionList options={options} />
        <div className={classes["color-scheme-container"]}>
          <span>RGB</span>
          <div className={classes["color-scheme-grid"]}>
            <span>{RGB.r}</span>
            <span>{RGB.g}</span>
            <span>{RGB.b}</span>
          </div>
        </div>
        <div className={classes["color-scheme-container"]}>
          <span>XYZ</span>
          <div className={classes["color-scheme-grid"]}>
            <span>{XYZ.x.toFixed(2)}</span>
            <span>{XYZ.y.toFixed(2)}</span>
            <span>{XYZ.z.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={exportHandler}>Export</button>
      </div>
    </div>
  );
};

export default ColorSchemesPage;
