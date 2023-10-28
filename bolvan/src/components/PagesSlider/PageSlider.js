import { useState } from "react";

import PageSliderItem from "./PageSilderItem";
import descriptions from "./Descriptions.json";
import { IoTriangleSharp, IoColorFilterOutline } from "react-icons/io5";
import { RiDragMoveLine } from "react-icons/ri";

import classes from "./PageSlider.module.css";

const PageSlider = () => {
  const [x, setX] = useState(0);

  const mouseEnterHandler = (id) => {
    const targetElement = document.getElementById(id);
    setX(targetElement.offsetLeft);
  };

  return (
    <ul className={classes["page-slider"]}>
      <div className={classes["animation-object"]} style={{ left: x + "px" }} />
      <PageSliderItem
        title="Fractals"
        icon={<IoTriangleSharp size={50} />}
        description={descriptions["fractals-description"]}
        id="first"
        onEnter={mouseEnterHandler}
        path="/fractals"
      />
      <PageSliderItem
        title="Color schemes"
        icon={<IoColorFilterOutline size={50} />}
        description={descriptions["fractals-description"]}
        id="second"
        onEnter={mouseEnterHandler}
        path="/color-schemes"
      />
      <PageSliderItem
        title="Moving images"
        icon={<RiDragMoveLine size={50} />}
        description={descriptions["fractals-description"]}
        id="third"
        onEnter={mouseEnterHandler}
        path="/moving-images"
      />
    </ul>
  );
};

export default PageSlider;
