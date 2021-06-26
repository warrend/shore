import React, { createContext, useState, useContext } from "react";
import localServices from "../../services/localServices";
import { USER, LESSONS, TOKEN } from "../../constants";
import { lessons as lessonData, user as userData } from "../../data";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isNewUser: null });
  const [lessons, setLessons] = useState([]);
  const [token, setToken] = useState("");

  const checkIfCompleted = (lesson) => {
    const computedValues = { isCompleted: false };

    if (user.finished.includes(lesson.id)) {
      computedValues.isCompleted = true;
    }

    return { ...lesson, ...computedValues };
  };

  const services = {
    getLessons: () => {
      const res = localServices.getData(LESSONS);
      // const updatedLessons = res.map((item) => checkIfCompleted(item));

      // console.log("update", updatedLessons);

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
    setLessons: () => {
      localServices.setData(LESSONS, lessonData);

      setLessons(lessonData);
    },
    setUser: () => {
      localServices.setData(USER, userData);

      setLessons(userData);
    },
    setData: (key, data) => {
      return localServices.setData(key, data);
    },
    updateFinishedLessons: async (finishedLesson) => {
      const finishedArray = await services.getUser();

      if (finishedArray.finished.includes(finishedLesson)) {
        return;
      }
      finishedArray.finished.push(finishedLesson);
      console.log("finished array", finishedArray);
      setUser(user);
      services.setData(USER, finishedArray);
    },
    registerUser: () => {
      services.setData(USER, user);
      services.setData(TOKEN, true);
      setToken(true);
    },
  };

  const selectors = {
    user,
    lessons,
    token,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
