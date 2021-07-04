import React from "react";
import cn from "classnames";
import { useApp } from "contexts/app";
import styles from "./Slider.module.scss";

function Menu({ children }) {
  const {
    selectors: { menuState },
    services: { changeMenuState },
  } = useApp();

  const btnClass = cn({
    [styles.wrapper]: true,
    [styles.closed]: !menuState,
  });

  return (
    <div className={btnClass}>
      <button onClick={() => changeMenuState(false)}>Close</button>
      {children}
    </div>
  );
}

export default Menu;
