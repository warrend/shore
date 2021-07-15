import React from 'react';
import { useHistory } from 'react-router-dom';
import { BACK_BUTTON, LESSONS_URL } from '../../constants';
import Button from '../interactions/Button';

function NoLesson() {
  const history = useHistory();

  const goBack = () => {
    history.push(LESSONS_URL);
  };

  return (
    <div>
      This lesson does not exist
      <Button name={BACK_BUTTON} onClick={goBack} />
    </div>
  );
}

export default NoLesson;
