import React from "react";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import Icon from "../Icon";
import { CLOSE_ICON } from "../../constants";
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
      <Icon icon={CLOSE_ICON} onClick={() => changeMenuState(false)} />
      <div className={styles.list}>
        {options.map(({ text, path }) => (
          <p className={styles.item} onClick={() => handleMenuClick(path)}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Menu;
