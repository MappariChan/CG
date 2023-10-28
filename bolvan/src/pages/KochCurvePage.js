import { useState } from "react";

import KochSnowflake from "../components/KochSnowflake/KochSnowflake";
import OptionList from "../components/OptionList/OptionList";

import classes from "./KochCurvePage.module.css";

const KochCurvePage = () => {
  const [iterations, setIterations] = useState(-1);
  const [isInverted, setIsInverted] = useState(false);

  const options = [
    {
      title: "iterations",
      value: iterations,
      setValue: setIterations,
      type: "range",
      min: -1,
      max: 4,
    },
    {
      title: "inverted",
      value: isInverted,
      setValue: setIsInverted,
      type: "checkbox",
    },
  ];

  return (
    <div className={classes["scene-options-container"]}>
      <KochSnowflake iterations={iterations} isInverted={isInverted} />
      <OptionList options={options} />
    </div>
  );
};

export default KochCurvePage;
