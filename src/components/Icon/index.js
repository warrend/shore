import React from "react";
import styles from "./Icon.module.scss";
import { iconMap } from "../icons";

function Icon({ onClick, icon }) {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <img src={iconMap[icon]} alt="icon" />
    </div>
  );
}

export default Icon;
