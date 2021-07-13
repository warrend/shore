import tracks from "./tracks";

const finishedData = tracks.reduce((acc, curr) => {
  acc[curr.id] = [];
  return acc;
}, {});

export default finishedData;
