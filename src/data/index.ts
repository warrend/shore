import tracks from './tracks';

export type Finished = {
  [key: string]: string[];
};

const finishedData = tracks.reduce<Finished>((acc, curr) => {
  acc[curr.id!] = [];
  return acc;
}, {});

export default finishedData;
