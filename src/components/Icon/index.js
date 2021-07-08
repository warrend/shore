import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./Icon.module.scss";
import { iconMap } from "../icons";

function Icon({ onClick, icon, background }) {
  const iconClass = cn({
    [styles.wrapper]: true,
    [styles.background]: background,
  });

  return (
    <div className={iconClass} onClick={onClick}>
      <img src={iconMap[icon]} alt="icon" className={styles.custom} />
    </div>
  );
}

Icon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  background: PropTypes.bool,
};

export default Icon;
