import React, { useEffect } from "react";
import { useApp } from "../../contexts/app";

function Main() {
  useEffect(() => {}, []);
  const { services, selectors } = useApp();

  return (
    <div>
      <button onClick={() => services.updateFinishedLessons(2)}>ADD</button>
    </div>
  );
}

export default Main;
