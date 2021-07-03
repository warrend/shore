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
  const [currentLesson, setCurrentLesson] = useState({ isComplete: null });
  const [token, setToken] = useState("");

  const checkIfCompleted = (lesson) => {
    const user = services.getUser();
    const computedValues = { isCompleted: false };

    if (user.finished.includes(`${lesson.id}`)) {
      computedValues.isCompleted = true;
    }

    return { ...lesson, ...computedValues };
  };

  const services = {
    getLessons: () => {
      const res = localServices.getData(LESSONS);
      const updatedLessons = res.map((item) => checkIfCompleted(item));

      setLessons(updatedLessons);
      return updatedLessons;
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
    updateFinishedLessons: async (lessonId) => {
      const user = await services.getUser();

      if (user.finished.includes(lessonId)) {
        return;
      }
      user.finished.push(lessonId);
      setUser(user);
      services.setData(USER, user);
      await services.getLesson(lessonId);
    },
    removeFinishedLesson: async (lessonId) => {
      const user = await services.getUser();

      if (!user.finished.includes(lessonId)) {
        return;
      }

      const updatedFinished = user.finished.filter(
        (id) => `${id}` !== lessonId
      );

      const updatedLesson = { ...user, finished: updatedFinished };

      setUser(updatedLesson);
      services.setData(USER, updatedLesson);
      services.getLesson(lessonId);
    },
    registerUser: () => {
      services.setData(USER, user);
      services.setData(TOKEN, true);
      setToken(true);
    },
    getLesson: (id) => {
      const lessons = services.getLessons();
      const lesson = lessons.find((item) => `${item.id}` === id);

      setCurrentLesson(lesson);
      return lesson;
    },
  };

  const selectors = {
    user,
    lessons,
    token,
    currentLesson,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
