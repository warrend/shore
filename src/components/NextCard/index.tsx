import React from 'react';
import { useHistory } from 'react-router-dom';
import { LESSONS_URL, COFFEE_ICON, LESSON } from '../../constants';
import styles from './NextCard.module.scss';
import Icon from '../Icon';
import { LessonData } from '../../sharedTypes';

type NextCardProps = {
  lesson: LessonData;
};

function NextCard({ lesson }: NextCardProps) {
  const { title, id } = lesson;
  const history = useHistory();

  const handleDetailCard = (lessonId: string | number) => {
    history.push(`${LESSONS_URL}/${lessonId}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(id)}
      onKeyPress={() => handleDetailCard(id)}
      role="button"
      tabIndex={0}
    >
      <Icon icon={COFFEE_ICON} background />
      <span className={styles.lesson}>
        {LESSON}
        {id}
      </span>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default NextCard;
