import React, { useEffect } from "react";
import { useApp } from "../../contexts/app";

function Main() {
  const { services, selectors } = useApp();

  console.log("selectors", selectors);

  useEffect(() => {
    const appInit = async () => {
      return await services.getData("yes");
    };

    appInit();
    // services.getData("test");
  }, []);

  return <div>Main</div>;
}

export default Main;
