import { Link } from "react-router-dom";
import { forwardRef } from "react";

import classes from "./FractalListItem.module.css";

const FractalListItem = forwardRef(({ to, title, id, onEnter }, ref) => {
  const mouseEnterHandler = () => {
    onEnter(id);
  };

  return (
    <li id={id} onMouseEnter={mouseEnterHandler} ref={ref}>
      <Link className={classes.link} to={to}>
        <div className={classes["list-item"]}>{title}</div>
      </Link>
    </li>
  );
});

export default FractalListItem;
