import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { button, alternate } from "./Button.module.scss";
function Button({ name, onClick, secondary }) {
  const btnClass = cn({
    [button]: button,
    [alternate]: secondary,
  });

  return (
    <button onClick={onClick} className={btnClass}>
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
};

export default Button;
