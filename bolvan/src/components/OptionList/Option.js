import classes from "./Option.module.css";

const Option = ({ title, value, setValue, type, min, max }) => {
  const inputChangeHandler = (event) => {
    if (type == "checkbox") {
      setValue(event.target.checked);
      return;
    }
    setValue(event.target.value);
  };

  return (
    <div className={classes["option-container"]}>
      <p className={classes.title}>{title}</p>
      <input
        onChange={inputChangeHandler}
        type={type}
        min={min}
        max={max}
        value={value}
        className={classes.option}
      />
    </div>
  );
};

export default Option;
