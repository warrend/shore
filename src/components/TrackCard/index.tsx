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

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(path)}
      onKeyPress={() => handleDetailCard(path)}
      tabIndex={0}
      role="button"
    >
      <div>
        <Icon icon={track.path} readonly background />
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.lessons}>{lessons.length} Lessons</p>
      </div>
    </div>
  );
}

export default TrackCard;
