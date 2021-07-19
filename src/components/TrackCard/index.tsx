import React from 'react';
import { useHistory } from 'react-router-dom';
import { TRACKS_URL } from '../../constants';
import { TrackData } from '../../sharedTypes';
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

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(path)}
      onKeyPress={() => handleDetailCard(path)}
      tabIndex={0}
      role="button"
    >
      <p>{title}</p>
      <p>{lessons.length} Lessons</p>
    </div>
  );
}

export default TrackCard;
