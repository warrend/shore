import React from 'react';
import { useHistory } from 'react-router-dom';
import { LESSON, TRACKS_URL } from '../../constants';
import styles from './NextCard.module.scss';
import Icon from '../Icon';
import { LessonData, TrackData } from '../../sharedTypes';

type NextCardProps = {
  lesson: LessonData;
  readTime: string;
  track?: TrackData;
};

function NextCard({ lesson, readTime, track }: NextCardProps) {
  const { title, id } = lesson!;
  const history = useHistory();

  const handleDetailCard = (lessonId: string | number) => {
    history.push(`${TRACKS_URL}/${track?.path}/lessons/${lessonId}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(id!)}
      onKeyPress={() => handleDetailCard(id!)}
      role="button"
      tabIndex={0}
    >
      <Icon icon={track?.path!} background />
      <div>
        <div className={styles.lesson}>
          <div className={styles.track}>{track?.title}</div>
          <div className={styles.lesson_info}>
            {LESSON} {id}
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.read}>{readTime}</div>
      </div>
    </div>
  );
}

export default NextCard;
