import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../../contexts/app';
import {
  RESET_MESSAGE,
  GO_BACK_BUTTON,
  RESET_DATA_BUTTON,
  LESSONS_URL,
  ROOT_URL,
} from '../../constants';
import Button from '../../components/interactions/Button';

function ResetScreen() {
  const history = useHistory();
  const {
    services: { resetData },
  } = useApp();

  const handleReset = () => {
    resetData();
    history.push(ROOT_URL);
  };

  return (
    <div>
      <Button onClick={() => history.push(LESSONS_URL)} name={GO_BACK_BUTTON} />
      {RESET_MESSAGE}
      <Button onClick={handleReset} name={RESET_DATA_BUTTON} />
    </div>
  );
}

export default ResetScreen;
