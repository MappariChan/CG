import Option from "./Option";

import classes from "./OptionList.module.css";

const OptionList = ({ options }) => {
  console.log(options);
  return (
    <ul className={classes.list}>
      {options.map((option) => (
        <Option {...option} />
      ))}
    </ul>
  );
};

export default OptionList;
