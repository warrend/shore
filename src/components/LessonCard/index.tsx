import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { LESSONS_URL } from '../../constants';
import styles from './LessonCard.module.scss';
import { LessonData } from '../../sharedTypes';
import Complete from '../Complete';
import clickTransition from '../../utils/clickTransition';

type LessonCardProps = {
  lesson: LessonData;
};

type LessonId = string | number;

function LessonCard({ lesson }: LessonCardProps) {
  const { title, id, isCompleted } = lesson;

  const history = useHistory();
  const location = useLocation();

  const handleDetailCard = (lessonId: LessonId) => {
    clickTransition(() =>
      history.push(`${location.pathname}/lessons/${lessonId}`)
    );
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(id!)}
      onKeyPress={() => handleDetailCard(id!)}
      role="button"
      tabIndex={0}
    >
      <div className={styles.header}>
        <div className={styles.number}>{id}</div>
        {title}
      </div>
      <Complete complete={isCompleted} />
    </div>
  );
}

export default LessonCard;
