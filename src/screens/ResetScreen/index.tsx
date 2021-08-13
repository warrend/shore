import React, { useState } from 'react';
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
import clickTransition from '../../utils/clickTransition';
import useTransition from '../../utils/useTransition';

function ResetScreen() {
  const history = useHistory();
  const [toggle, setToggle] = useState<boolean>(false);

  const {
    services: { resetData },
  } = useApp();

  useTransition();

  const handleReset = () => {
    resetData();
    clickTransition(() => history.push(WELCOME_URL));
  };

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => clickTransition(() => history.push(TRACKS_URL))}
        name={GO_BACK_BUTTON}
        secondary
      />
      <div className={styles.message}>{RESET_MESSAGE}</div>
      <div className={styles.buttons}>
        <Switch onChange={(e: any) => setToggle(e.target.checked)} />
        <Button
          onClick={handleReset}
          name={RESET_DATA_BUTTON}
          warning
          disabled={!toggle}
        />
      </div>
    </div>
  );
}

export default ResetScreen;
