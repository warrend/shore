import React, { createContext, useState, useContext } from 'react';
import localServices from '../../services/localServices';
import { FINISHED, TOKEN, TOKEN_VALUE, TOKEN_INACTIVE } from '../../constants';
import finishedData from '../../data';
import tracksData from '../../data/tracks';
import { setTokenSourceMapRange } from 'typescript';

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [sliderState, setSliderState] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [finished, setFinished] = useState(undefined);
  const [menuState, setMenuState] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [lesson, setLesson] = useState(undefined);
  const [showWelcome, setShowWelcome] = useState(undefined);
  const [trackLessonsLength, setTrackLessonsLength] = useState(undefined);

  const selectors = {
    sliderState,
    menuState,
    markdown,
    finished,
    tracks,
    lesson,
    trackLessonsLength,
    showWelcome,
  };

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
      const tokenCheck = localServices.getData(TOKEN);

      if (!tokenCheck || tokenCheck === TOKEN_INACTIVE) {
        try {
          services.setData(FINISHED, finishedData);
          services.setData(TOKEN, TOKEN_INACTIVE);
          setShowWelcome(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          setShowWelcome(false);
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
    getLesson: async (slug, lessonId) => {
      // set lesson
      const track =
        selectors.tracks && selectors.tracks.find((t) => t.path === slug);
      setTrackLessonsLength(track.lessons.length);
      const trackLesson =
        track.lessons && track.lessons.find((l) => `${l.id}` === lessonId);

      // set markdown file
      const file = await import(
        `../../data/tracks/${slug}/${trackLesson.path}`
      );
      const res = await fetch(file.default);
      const markdownFile = await res.text();

      setMarkdown(markdownFile);
      setLesson(checkIfCompleted(trackLesson, track.id));
    },
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
    finishLesson: async (slug, lessonId) => {
      const finished = await services.getFinished();
      const finishedTrack = selectors.tracks.find(
        (track) => track.path === slug
      );
      if (finishedTrack.lessons.includes(lessonId)) {
        return;
      }

      finished[finishedTrack.id].push(lessonId);
      setFinished(finished);
      services.setData(FINISHED, finished);
      await services.getLesson(slug, lessonId);
    },
    removeFinishedLesson: async (slug, lessonId) => {
      let finishedList = await services.getFinished();
      const finishedTrack = selectors.tracks.find(
        (track) => track.path === slug
      );
      if (!selectors.finished[finishedTrack.id].includes(`${lessonId}`)) {
        return;
      }

      const filteredFinished = selectors.finished[finishedTrack.id].filter(
        (lesson) => lesson !== lessonId
      );

      finishedList[finishedTrack.id] = filteredFinished;

      setFinished(finishedList);
      services.setData(FINISHED, finishedList);
      await services.getLesson(slug, lessonId);
    },
    registerUser: () => {
      services.setData(TOKEN, TOKEN_VALUE);
    },
    updatePageScroll: (state) => {
      if (state) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
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
    resetData: async () => {
      try {
        services.setData(TOKEN, TOKEN_INACTIVE);
        setShowWelcome(true);
      } catch (error) {
        console.error(error);
      }
    },
  };

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
