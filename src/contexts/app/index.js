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
  const [finished, setFinished] = useState([]);
  const [menuState, setMenuState] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const services = {
    getUser: () => {
      const res = localServices.getData(USER);

      setUser(res);
      return res;
    },
    getFinished: (trackId) => {
      const res = localServices.getData(USER);

      console.log("in", res.finished, trackId);
      const finished = res.finished[trackId];

      setFinished(finished);
      return finished;
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
    updateFinishedLessons: async (lessonId, trackId) => {
      const finished = await services.getFinished(trackId);

      if (finished.includes(lessonId)) {
        return;
      }

      finished[trackId].push(lessonId);
      setFinished(finished);
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
    finished,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
