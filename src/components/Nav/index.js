import React from "react";
import { useApp } from "../../contexts/app";
import styles from "./Nav.module.scss";
import Icon from "../Icon";
import { MENU_ICON } from "../../constants";

function Nav() {
  const {
    services: { changeMenuState },
  } = useApp();

  return (
    <div className={styles.wrapper}>
      <div>
        <Icon onClick={() => changeMenuState(true)} icon={MENU_ICON} />
      </div>
    </div>
  );
}

export default Nav;
