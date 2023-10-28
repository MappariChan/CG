import { Link } from "react-router-dom";
import classes from "./PageSliderItem.module.css";

const PageSliderItem = ({ title, icon, description, onEnter, id, path }) => {
  const mouseEnterEvent = () => {
    onEnter(id);
  };

  return (
    <li id={id} onMouseEnter={mouseEnterEvent}>
      <Link to={path} className={classes.container}>
        <h2>{title}</h2>
        <div className={classes["icon-container"]}>{icon}</div>
        <p>{description}</p>
      </Link>
    </li>
  );
};

export default PageSliderItem;
