import classes from "./Option.module.css";

const Option = (props) => {
  const inputChangeHandler = (event) => {
    if (props.type == "checkbox") {
      props.setValue(event.target.checked);
      return;
    }
    props.setValue(event.target.value);
  };

  return (
    <div className={classes["option-container"]}>
      <p className={classes.title}>{props.title}</p>
      <input
        onChange={inputChangeHandler}
        {...props}
        className={classes.option}
      />
    </div>
  );
};

export default Option;
