import React from "react";
import cn from "classnames";
import { useApp } from "contexts/app";
import styles from "./Slider.module.scss";

function Slider({ children }) {
  const {
    selectors: { sliderState },
    services: { changeSliderState },
  } = useApp();

  const btnClass = cn({
    [styles.wrapper]: true,
    [styles.closed]: !sliderState,
  });

  return (
    <div className={btnClass}>
      <button onClick={() => changeSliderState(false)}>Close</button>
      {children}
    </div>
  );
}

export default Slider;
