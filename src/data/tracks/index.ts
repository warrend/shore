import lessons from './collecting';
import writing from './writing';
import { TrackData } from '../../sharedTypes';

const tracksData: TrackData[] = [
  {
    id: 0,
    title: 'Collecting',
    path: 'collecting',
    lessons,
  },
  {
    id: 1,
    title: 'Writing',
    path: 'writing',
    lessons: writing,
  },
];

export default tracksData;
