import lessons from './collecting';
import writing from './writing';
import revising from './revising';
import submitting from './submitting';
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
  {
    id: 2,
    title: 'Revising',
    path: 'revising',
    lessons: revising,
  },
  {
    id: 3,
    title: 'Submitting',
    path: 'submitting',
    lessons: submitting,
  },
];

export default tracksData;
