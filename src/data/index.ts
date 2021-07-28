import tracks from './tracks';

export type Finished = {
  [key: string]: string[];
};

export type TLastFinished = {
  track: string;
  lesson: string;
};

export const lastFinished = { track: '', lesson: '' };

const finishedData = tracks.reduce<Finished>((acc, curr) => {
  acc[curr.id!] = [];
  return acc;
}, {});

export default finishedData;
