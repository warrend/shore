import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";

function Welcome() {
  const history = useHistory();
  const {
    services: { registerUser },
    selectors: {
      user: { isNewUser },
    },
  } = useApp();

  useEffect(() => {
    if (!isNewUser) {
      history.push("/main");
    }
  }, []);

  const handleRegisterUser = () => {
    registerUser();
    history.push("/main");
  };

  return (
    <div>
      Welcome to Raft. Get started with your first lesson
      <button onClick={handleRegisterUser}>START</button>
    </div>
  );
}

export default Welcome;
