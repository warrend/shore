import React, { createContext, useState, useContext } from "react";
import localServices from "../../services/localServices";
import { USER, LESSONS } from "../../constants";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [lessons, setLessons] = useState({});

  const services = {
    getLessons: () => {
      const res = localServices.getData(LESSONS);

      setLessons(res);
      return res;
    },
    getUser: () => {
      const res = localServices.getData(USER);

      setUser(res);
      return res;
    },
    getData: (key) => {
      const res = localServices.getData(key);

      return res;
    },
    setData: (key, data) => {
      return localServices.setData(key, data);
    },
    updateFinishedLessons: (finishedLesson) => {
      const finishedArray = selectors.user.finished;

      if (finishedArray.includes(finishedLesson)) {
        return;
      }
      const updatedLessonArray = [...selectors.user.finished, finishedLesson];
      services.setData(USER, { ...user, finished: updatedLessonArray });
    },
    registerUser: () => {
      services.setData(USER, { ...user, isNewUser: false });
    },
  };

  const selectors = {
    user,
    lessons,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
