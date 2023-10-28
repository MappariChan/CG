import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

import classes from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className={classes["main-content"]}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
