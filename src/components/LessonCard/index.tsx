import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LESSONS_URL } from '../../constants';
import styles from './LessonCard.module.scss';
import { LessonData } from '../../sharedTypes';
import Complete from '../Complete';

type LessonCardProps = {
  lesson: LessonData;
};

type LessonId = string | number;

function LessonCard({ lesson }: LessonCardProps) {
  const { title, id, isCompleted } = lesson;
  const history = useHistory();
  const location = useLocation();

  const handleDetailCard = (lessonId: LessonId) => {
    history.push(`${location.pathname}${LESSONS_URL}/${lessonId}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(id)}
      onKeyPress={() => handleDetailCard(id)}
      role="button"
      tabIndex={0}
    >
      <div className={styles.header}>
        <div className={styles.number}>{id}</div>
        {title}
      </div>
      {isCompleted && <Complete />}
    </div>
  );
}

export default LessonCard;
