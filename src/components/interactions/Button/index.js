import React from "react";
import { button } from "./Button.module.scss";

function Button({ name, onClick }) {
  return (
    <button onClick={onClick} className={button}>
      {name}
    </button>
  );
}

export default Button;
