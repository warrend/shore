import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../../contexts/app';
import {
  RESET_MESSAGE,
  GO_BACK_BUTTON,
  RESET_DATA_BUTTON,
  WELCOME_URL,
  TRACKS_URL,
} from '../../constants';
import Button from '../../components/interactions/Button';
import styles from './ResetScreen.module.scss';
import Switch from '../../components/Switch';

function ResetScreen() {
  const history = useHistory();
  const {
    services: { resetData },
  } = useApp();

  const handleReset = () => {
    resetData();
    history.push(WELCOME_URL);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => history.push(TRACKS_URL)}
        name={GO_BACK_BUTTON}
        secondary
      />
      <div className={styles.message}>{RESET_MESSAGE}</div>
      <div className={styles.buttons}>
        <Switch onChange={(e: any) => console.log(e.target.checked)} />
        <Button onClick={handleReset} name={RESET_DATA_BUTTON} warning />
      </div>
    </div>
  );
}

export default ResetScreen;
