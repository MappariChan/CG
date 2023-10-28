import { useState } from "react";

import MandelbrotCanvasMatvii from "../components/MandelbrotCanvas/MandelbrotCanvasMatvii";
import OptionList from "../components/OptionList/OptionList";

import classes from "./KochCurvePage.module.css";

const MandelbrotPage = () => {
  const [power, setPower] = useState(2);

  const options = [
    {
      title: "power",
      value: power,
      setValue: setPower,
      type: "range",
      min: 2,
      max: 5,
    },
  ];

  return (
    <div className={classes["scene-options-container"]}>
      <MandelbrotCanvasMatvii power={power} />
      <OptionList options={options} />
    </div>
  );
};

export default MandelbrotPage;
