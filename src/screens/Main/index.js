import React, { useEffect } from "react";
import { useApp } from "../../contexts/app";
import { user, data } from "../../data";

function Main() {
  const { services, selectors } = useApp();

  console.log("se", selectors);

  useEffect(() => {
    const appInit = async () => {
      const res = await services.getData("user");

      if (res) {
        await services.getUser();
        await services.getLessons();
      } else {
        await services.setData("user", user);
        await services.setData("lessons", data);
      }
    };

    appInit();
  }, []);

  return <div>Main</div>;
}

export default Main;
