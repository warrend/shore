import React, { createContext, useState, useContext } from "react";
import localServices from "../../services/localServices";
import { FINISHED, TOKEN, TOKEN_VALUE } from "../../constants";
import finishedData from "../../data";
import tracksData from "../../data/tracks";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [sliderState, setSliderState] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [finished, setFinished] = useState(undefined);
  const [menuState, setMenuState] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [lesson, setLesson] = useState(undefined);

  const checkIfCompleted = (lesson, trackId) => {
    const computedValues = { isCompleted: false };

    if (
      selectors.finished &&
      selectors.finished[trackId].includes(`${lesson.id}`)
    ) {
      computedValues.isCompleted = true;
    }

    return { ...lesson, ...computedValues };
  };

  const services = {
    startApp: async () => {
      const token = localStorage.token;
      if (!token) {
        try {
          services.setData(FINISHED, finishedData);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await services.getFinished();
          const tracksWithFinishedData = tracksData.reduce((acc, curr) => {
            const updatedLessons = curr.lessons.map((lesson) =>
              checkIfCompleted(lesson, curr.id)
            );
            acc.push({
              ...curr,
              lessons: updatedLessons,
            });

            return acc;
          }, []);
          setTracks(tracksWithFinishedData);
        } catch (error) {
          console.log(error);
        }
      }
    },
    getLesson: (slug, lessonId) => {
      const track =
        selectors.tracks && selectors.tracks.find((t) => t.path === slug);
      const trackLesson =
        track.lessons && track.lessons.find((l) => `${l.id}` === lessonId);

      // set MD

      setLesson(trackLesson);
    },
    // addFinishedToLesson: async (lessons) => {
    //   const finishedObj = await services.getData(FINISHED);

    //   return lessons.map((lesson) =>
    //     checkIfCompleted(lesson, finishedObj[trackId])
    //   );
    // },
    getFinished: async () => {
      try {
        const res = await localServices.getData(FINISHED);

        setFinished(res);
        return finished;
      } catch (error) {
        console.error(error);
      }
    },
    getData: (key) => {
      const res = localServices.getData(key);

      return res;
    },
    setData: (key, data) => {
      return localServices.setData(key, data);
    },
    // updateFinishedLessons: async (lessonId, trackId) => {
    //   const finished = await services.getFinished(trackId);

    //   if (finished.includes(lessonId)) {
    //     return;
    //   }

    //   finished[trackId].push(lessonId);
    //   setFinished(finished);
    //   services.setData(FINISHED, user);
    //   await services.getLesson(lessonId);
    // },
    // removeFinishedLesson: async (lessonId) => {
    //   const user = await services.getUser();

    //   if (!user.finished.includes(lessonId)) {
    //     return;
    //   }

    //   const updatedFinished = user.finished.filter(
    //     (id) => `${id}` !== lessonId
    //   );

    //   const updatedLesson = { ...user, finished: updatedFinished };

    //   setUser(updatedLesson);
    //   services.setData(USER, updatedLesson);
    //   services.getLesson(lessonId);
    // },
    registerUser: () => {
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
    sliderState,
    menuState,
    markdown,
    finished,
    tracks,
    lesson,
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
