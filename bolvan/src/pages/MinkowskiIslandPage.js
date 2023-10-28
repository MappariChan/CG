import { useState } from "react";

import MinkowskiIsland from "../components/MinkowskiIsland/MinkowskiIsland";
import OptionList from "../components/OptionList/OptionList";

import classes from "./KochCurvePage.module.css";

const MinkowskiIslandPage = () => {
  const [iterations, setIterations] = useState(-1);

  const options = [
    {
      title: "iterations",
      value: iterations,
      setValue: setIterations,
      type: "range",
      min: -1,
      max: 4,
    },
  ];

  return (
    <div className={classes["scene-options-container"]}>
      <MinkowskiIsland iterations={iterations} />
      <OptionList options={options} />
    </div>
  );
};

export default MinkowskiIslandPage;
