import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LESSONS_URL, WELCOME_COPY } from "../../constants";
import { useApp } from "../../contexts/app";

function Welcome() {
  const history = useHistory();
  const {
    services: { registerUser },
  } = useApp();

  const handleRegisterUser = () => {
    registerUser();
    history.push(LESSONS_URL);
  };

  return (
    <div>
      {WELCOME_COPY}
      <button onClick={handleRegisterUser}>START</button>
    </div>
  );
}

export default Welcome;
