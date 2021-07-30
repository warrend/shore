import React from 'react';
import { useHistory } from 'react-router-dom';
import { TRACKS_URL } from '../../constants';
import { TrackData } from '../../sharedTypes';
import Icon from '../Icon';
import styles from './TrackCard.module.scss';

type TrackCardProps = {
  track: TrackData;
};

function TrackCard({ track }: TrackCardProps) {
  const { title, path, lessons } = track;
  const history = useHistory();

  const handleDetailCard = (lessonId: string | number) => {
    history.push(`${TRACKS_URL}/${lessonId}`);
  };

  const completedPercentage = () => {
    const num = track?.lessons?.reduce((acc, curr) => {
      if (curr.isCompleted) {
        // eslint-disable-next-line no-param-reassign
        acc += 1;
      }

      return acc;
    }, 0);

    // @ts-ignore
    return Math.round((num! / lessons.length) * 100);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(path!)}
      onKeyPress={() => handleDetailCard(path!)}
      tabIndex={0}
      role="button"
    >
      <div>
        <Icon icon={track.path!} readonly background />
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.lessons}>{lessons?.length} lessons</p>
        <p className={styles.highlight}>{completedPercentage()} percent read</p>
      </div>
    </div>
  );
}

export default TrackCard;
