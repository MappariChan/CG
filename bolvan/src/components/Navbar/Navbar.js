import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navigation}>
      <h1>bolvan</h1>
      <ul className={classes["list-of-links"]}>
        <li className={classes["link-container"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes["active-link"] : ""
            }
          >
            home
          </NavLink>
        </li>
        <li className={classes["link-container"]}>
          <NavLink
            to="/fractals"
            className={({ isActive }) =>
              isActive ? classes["active-link"] : ""
            }
          >
            fractals
          </NavLink>
        </li>
        <li className={classes["link-container"]}>
          <NavLink
            to="/color-schemes"
            className={({ isActive }) =>
              isActive ? classes["active-link"] : ""
            }
          >
            color schemes
          </NavLink>
        </li>
        <li className={classes["link-container"]}>
          <NavLink
            to="/moving-images"
            className={({ isActive }) =>
              isActive ? classes["active-link"] : ""
            }
          >
            moving images
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
