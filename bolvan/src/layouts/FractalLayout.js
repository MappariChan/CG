import { Outlet } from "react-router-dom";

import FractalList from "../components/FractalList/FractalList";

import classes from "./FractalLayout.module.css";

const FractalLayout = () => {
  return (
    <div className={classes["layout-container"]}>
      <FractalList />
      <Outlet />
    </div>
  );
};

export default FractalLayout;
