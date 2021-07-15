import React, { createContext, useState, useContext } from 'react';
import localServices from '../../services/localServices';
import { FINISHED, TOKEN, TOKEN_VALUE, TOKEN_INACTIVE } from '../../constants';
import finishedData, { Finished } from '../../data';
import tracksData from '../../data/tracks';
import { LessonData, TrackData } from '../../sharedTypes';

type ContextProps = {
  children?: React.ReactNode;
};

type ServicesEntry = { [key: string]: any };
type SelectorEntry = { [key: string]: any };

type ContextValues = {
  services: ServicesEntry;
  selectors: SelectorEntry;
};

export const AppContext = createContext({} as ContextValues);

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }: ContextProps) => {
  const [sliderState, setSliderState] = useState<boolean | null>(null);
  const [tracks, setTracks] = useState<TrackData[] | undefined>(undefined);
  const [finished, setFinished] = useState<Finished>(finishedData);
  const [menuState, setMenuState] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [lesson, setLesson] = useState<LessonData | undefined>(undefined);
  const [showWelcome, setShowWelcome] = useState<boolean | undefined>(
    undefined
  );
  const [trackLessonsLength, setTrackLessonsLength] = useState<
    number | undefined
  >(undefined);

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

  const checkIfCompleted = (
    lessonData: LessonData,
    trackId: string | number
  ) => {
    const computedValues = { isCompleted: false };

    if (
      selectors.finished &&
      selectors.finished[trackId].includes(`${lessonData.id}`)
    ) {
      computedValues.isCompleted = true;
    }

    return { ...lessonData, ...computedValues };
  };

  const services = {
    startApp: async () => {
      const tokenCheck = localServices.getData(TOKEN);

      if (!tokenCheck || tokenCheck === TOKEN_INACTIVE) {
        try {
          services.setData(FINISHED, finishedData);
          services.setData(TOKEN, TOKEN_INACTIVE);
          return setShowWelcome(true);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          setShowWelcome(false);
          await services.getFinished();
          const tracksWithFinishedData = tracksData.reduce((acc, curr) => {
            const updatedLessons = curr.lessons.map((l) =>
              checkIfCompleted(l, curr.id)
            );
            acc.push({
              ...curr,
              lessons: updatedLessons,
            });

            return acc;
          }, [] as TrackData[]);
          console.log('am i running');
          setTracks(tracksWithFinishedData);
        } catch (e) {
          console.log(e);
        }
      }
      return 'fart';
    },
    getLesson: async (slug: string, lessonId: string) => {
      // set lesson
      const track =
        selectors.tracks && selectors.tracks.find((t) => t.path === slug);
      setTrackLessonsLength(track?.lessons.length);
      const trackLesson =
        track?.lessons && track.lessons.find((l) => `${l.id}` === lessonId);

      // set markdown file
      const file = await import(
        `../../data/tracks/${slug}/${trackLesson?.path}`
      );
      const res = await fetch(file.default);
      const markdownFile = await res.text();

      setMarkdown(markdownFile);
      setLesson(checkIfCompleted(trackLesson!, `${track?.id}`));
    },
    getFinished: async () => {
      const res = await localServices.getData(FINISHED);

      setFinished(res);
      return finished;
    },
    getData: (key: string) => {
      const res = localServices.getData(key);

      return res;
    },
    setData: (key: string, data: string | object) =>
      localServices.setData(key, data),
    finishLesson: async (slug: string, lessonId: string) => {
      const finishedObj = await services.getFinished();
      const finishedTrack = selectors.tracks?.find(
        (track) => track.path === slug
      );
      if (finishedObj[`${finishedTrack?.id}`].includes(lessonId)) {
        return;
      }

      finishedObj[`${finishedTrack?.id}`].push(lessonId);
      setFinished(finished);
      services.setData(FINISHED, finishedObj);
      await services.getLesson(slug, lessonId);
    },
    removeFinishedLesson: async (slug: string, lessonId: string) => {
      const finishedList = await services.getFinished();
      const finishedTrack = selectors.tracks?.find(
        (track) => track.path === slug
      );
      if (!selectors.finished[`${finishedTrack?.id}`].includes(`${lessonId}`)) {
        return;
      }

      const filteredFinished = selectors.finished[
        `${finishedTrack?.id}`
      ].filter((l) => l !== lessonId);

      finishedList[`${finishedTrack?.id}`] = filteredFinished;

      setFinished(finishedList);
      services.setData(FINISHED, finishedList);
      await services.getLesson(slug, lessonId);
    },
    registerUser: () => {
      services.setData(TOKEN, TOKEN_VALUE);
    },
    updatePageScroll: (state: boolean) => {
      if (state) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    changeSliderState: (state: boolean) => {
      setSliderState(state);
      services.updatePageScroll(state);
    },
    changeMenuState: (state: boolean) => {
      setMenuState(state);
      services.updatePageScroll(state);
    },
    resetData: async () => {
      services.setData(TOKEN, TOKEN_INACTIVE);
      setShowWelcome(true);
    },
  };

  const context = {
    services,
    selectors,
  };

  console.log('selectors', selectors);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
