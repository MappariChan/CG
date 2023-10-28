import { useEffect, useRef, useState } from "react";

import FractalListItem from "./FractalListItem";

import classes from "./FractalList.module.css";

const FractalList = () => {
  const [y, setY] = useState(0);
  const [height, setHegiht] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const listElement = ref.current;
    setHegiht(listElement.clientHeight);
  }, []);

  const mouseEnterHandler = (id) => {
    const targetElement = document.getElementById(id);
    setY(targetElement.offsetTop);
  };

  return (
    <ul className={classes["fractal-list"]}>
      <div
        style={{
          top: y + "px",
          height: height + "px",
        }}
        className={classes["animation-object"]}
      />
      <FractalListItem
        to="mandelbrot"
        title="mandelbrot"
        ref={ref}
        id="mandelbrot"
        onEnter={mouseEnterHandler}
      />
      <FractalListItem
        to="koch_curve"
        title="koch curve"
        id="koch_curve"
        onEnter={mouseEnterHandler}
      />
      <FractalListItem
        to="minkowski_island"
        title="island"
        id="minkowski_island"
        onEnter={mouseEnterHandler}
      />
    </ul>
  );
};

export default FractalList;
