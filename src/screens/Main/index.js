import React, { useEffect } from "react";
import { useApp } from "../../contexts/app";

function Main() {
  useEffect(() => {}, []);
  const { services, selectors } = useApp();

  return <div>Main</div>;
}

export default Main;
