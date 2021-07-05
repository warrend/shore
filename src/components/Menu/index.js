import React from "react";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import styles from "./Menu.module.scss";
import { options } from "./options";

function Menu() {
  const history = useHistory();
  const {
    selectors: { menuState },
    services: { changeMenuState },
  } = useApp();

  const btnClass = cn({
    [styles.wrapper]: true,
    [styles.closed]: !menuState,
  });

  const handleMenuClick = (path) => {
    history.push(path);
    changeMenuState(false);
  };

  return (
    <div className={btnClass}>
      <button onClick={() => changeMenuState(false)}>Close</button>
      <ul>
        {options.map(({ text, path }) => (
          <li onClick={() => handleMenuClick(path)}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
