import {
  FINISHED,
  FIRST_LESSON_ID,
  AVE_READING_SPEED,
  READ_TIME_COPY,
} from '../../constants';
import { LessonData, TrackData } from '../../sharedTypes';
// import finishedData, { Finished } from '../../data';
import tracksData from '../../data/tracks';

const localServices = {
  getData: (item: string) => {
    const res = localStorage.getItem(item) || '';
    return JSON.parse(res);
  },
  setData: (name: string, data: any) => {
    const dataString = JSON.stringify(data);
    return localStorage.setItem(name, dataString);
  },
  getTracks: () => {
    const tracksWithFinishedData = tracksData.reduce(
      (acc: TrackData[], curr: TrackData) => {
        const updatedLessons = curr?.lessons?.map((l) =>
          localServices.checkIfCompleted(l, curr.id!)
        );
        acc.push({
          ...curr,
          lessons: updatedLessons,
        });

        return acc;
      },
      [] as TrackData[]
    );

    return tracksWithFinishedData;
  },
  getMarkdown: async (slug: string, trackLesson: LessonData) => {
    const file = await import(`../../data/tracks/${slug}/${trackLesson?.path}`);
    const res = await fetch(file.default);
    const markdownFile = await res.text();
    return markdownFile;
  },

  getLesson: async (slug: string, lessonId: string) => {
    // get lesson
    const tracks = localServices.getTracks();
    const track = tracks && tracks.find((t: TrackData) => t.path === slug);

    const trackLesson =
      track?.lessons &&
      track.lessons.find((l: LessonData) => `${l.id}` === lessonId);

    // get markdown file
    const markdownFile = await localServices.getMarkdown(slug, trackLesson!);

    const strippedMd = localServices.getLessonReadTime(markdownFile);
    const minsRead = Math.ceil(
      strippedMd.split(' ').length / AVE_READING_SPEED
    );

    return {
      markdown: markdownFile,
      lesson: trackLesson,
      readTime: `${minsRead} ${READ_TIME_COPY}`,
    };
  },
  getLessonReadTime: (md: string) => {
    const strippedMd = md.replace(/[^\w\s]/g, '');
    return strippedMd;
  },
  getTrack: (slug: string) => {
    const track = tracksData.find((t: TrackData) => t.path === slug);
    const lessonData = track?.lessons?.map((lesson) =>
      localServices.checkIfCompleted(lesson, track.id!)
    );

    return { ...track, lessons: lessonData };
  },
  checkIfCompleted: (lessonData: LessonData, trackId: string | number) => {
    const computedValues = { isCompleted: false };
    const finishedObj = localServices.getData(FINISHED);

    if (finishedObj && finishedObj[trackId].includes(`${lessonData.id}`)) {
      computedValues.isCompleted = true;
    }

    return { ...lessonData, ...computedValues };
  },
  finishLesson: (slug: string, lessonId: string) => {
    const finishedObj = localServices.getData(FINISHED);
    const finishedTrack = tracksData?.find((track) => track.path === slug);
    if (finishedObj[`${finishedTrack?.id}`].includes(lessonId)) {
      return null;
    }

    finishedObj[`${finishedTrack?.id}`].push(lessonId);
    localServices.setData(FINISHED, finishedObj);
    return localServices.getLesson(slug, lessonId);
  },
  removeFinishedLesson: (slug: string, lessonId: string) => {
    const finishedList = localServices.getData(FINISHED);
    const finishedTrack = tracksData?.find((track) => track.path === slug);
    if (!finishedList[`${finishedTrack?.id}`].includes(`${lessonId}`)) {
      return null;
    }

    const filteredFinished = finishedList[`${finishedTrack?.id}`].filter(
      (l: string) => l !== lessonId
    );

    finishedList[`${finishedTrack?.id}`] = filteredFinished;

    localServices.setData(FINISHED, finishedList);

    return localServices.getLesson(slug, lessonId);
  },
  getNextLesson: (slug: string) => {
    const finishedList = localServices.getData(FINISHED);
    const currentTrack = tracksData?.find((track) => track.path === slug);
    const finishedLessons = finishedList[currentTrack?.id!];

    // if no completed lessons
    if (!finishedLessons.length) {
      // return the first lesson
      return localServices.getLesson(slug, FIRST_LESSON_ID);
    }

    // get the last finished lesson
    const lastFinishedLesson = finishedLessons.reduce(
      (acc: number, curr: number) => (acc > curr ? acc : curr)
    );

    // if the last lesson is already done, return null
    if (lastFinishedLesson === currentTrack?.lessons?.length.toString()) {
      return null;
    }

    const nextLesson = parseInt(lastFinishedLesson, 10) + 1;
    // else return the next lesson
    return localServices.getLesson(slug, `${nextLesson}`);
  },
};

export default localServices;
