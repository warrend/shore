import React, { createContext, useState, useContext } from "react";
import localServices from "../../services/localServices";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [data, setData] = useState({});

  const services = {
    getData: (key) => {
      const res = localServices.getData(key);
      console.log("resss", res);
      // const parsedData = JSON.parse(res);

      setData(JSON.parse(res, 2, null));
    },
    setData: (key, data) => {
      return localServices.setData(key, data);
    },
  };

  const selectors = {
    data,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
