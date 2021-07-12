import tracks from "./tracks";

const ids = tracks.reduce((acc, curr) => {
  acc[curr.id] = [];
  return acc;
}, {});

export const user = {
  finished: ids,
};
