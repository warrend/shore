import React from "react";
import { useApp } from "../../contexts/app";
import styles from "./Nav.module.scss";
import Menu from "../../components/Menu";

function Nav() {
  const {
    services: { changeMenuState },
  } = useApp();

  return (
    <div className={styles.wrapper}>
      <div onClick={() => changeMenuState(true)}>SHIT</div>
    </div>
  );
}

export default Nav;
