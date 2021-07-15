import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LESSONS_URL } from '../../constants';
import styles from './LessonCard.module.scss';
import { LessonData } from '../../sharedTypes';

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
      <div>
        <span className={styles.number}>{id}</span>
        {title}
      </div>
      <div className={styles.complete}>{isCompleted && 'complete'}</div>
    </div>
  );
}

export default LessonCard;
