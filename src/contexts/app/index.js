import React, { createContext, useState, useContext } from "react";
import localServices from "../../services/localServices";
import { USER, TOKEN, TOKEN_VALUE } from "../../constants";
import { user as userData } from "../../data";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isNewUser: null });
  const [sliderState, setSliderState] = useState(null);
  const [menuState, setMenuState] = useState(false);
  const [markdown, setMarkdown] = useState("");

  // const checkIfCompleted = (lesson) => {
  //   const user = services.getUser();
  //   const computedValues = { isCompleted: false };

  //   if (user.finished.includes(`${lesson.id}`)) {
  //     computedValues.isCompleted = true;
  //   }

  //   return { ...lesson, ...computedValues };
  // };

  const services = {
    // getMarkdown: async (slug, lessonId) => {
    //   const path = track.lessons.lessons.find(
    //     (item) => `${item.id}` === lessonId
    //   );
    //   if (!path) {
    //     return;
    //   }
    //   const file = await import(`../../data/tracks/${slug}/${path.path}`);
    //   const res = await fetch(file.default);
    //   const markdownFile = await res.text();

    //   setMarkdown(markdownFile);

    //   return markdownFile;
    // },
    getUser: () => {
      const res = localServices.getData(USER);

      setUser(res);
      return res;
    },
    getData: (key) => {
      const res = localServices.getData(key);

      return res;
    },
    setUser: () => {
      localServices.setData(USER, userData);

      setUser(userData);
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
      services.setUser();
      services.setLessons();
      services.setData(TOKEN, TOKEN_VALUE);
    },
    updatePageScroll: (state) => {
      if (state) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
    changeSliderState: (state) => {
      setSliderState(state);
      services.updatePageScroll(state);
    },
    changeMenuState: (state) => {
      setMenuState(state);
      services.updatePageScroll(state);
    },
    resetData: () => {
      try {
        localStorage.removeItem(TOKEN);
        services.setUser();
      } catch (error) {
        console.error(error);
      }
    },
  };

  const selectors = {
    user,
    sliderState,
    menuState,
    markdown,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
