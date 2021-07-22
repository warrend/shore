import { FINISHED } from '../../constants';
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

    return {
      markdown: markdownFile,
      lesson: trackLesson,
    };
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
};

export default localServices;
