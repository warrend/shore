import React from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import {
  RESET_MESSAGE,
  GO_BACK_BUTTON,
  RESET_DATA_BUTTON,
  LESSONS_URL,
  ROOT_URL,
} from "../../constants";

function ResetScreen() {
  const history = useHistory();
  const {
    services: { resetData },
  } = useApp();

  const handleReset = async () => {
    await resetData();
    history.push(ROOT_URL);
  };

  return (
    <div>
      <button onClick={() => history.push(LESSONS_URL)}>
        {GO_BACK_BUTTON}
      </button>
      {RESET_MESSAGE}
      <button onClick={handleReset}>{RESET_DATA_BUTTON}</button>
    </div>
  );
}

export default ResetScreen;
