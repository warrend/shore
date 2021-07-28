import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LESSONS_URL, COFFEE_ICON, LESSON } from '../../constants';
import styles from './NextCard.module.scss';
import Icon from '../Icon';
import { LessonData } from '../../sharedTypes';

type NextCardProps = {
  lesson: LessonData;
  readTime: string;
};

function NextCard({ lesson, readTime }: NextCardProps) {
  const { title, id } = lesson!;
  const history = useHistory();
  const location = useLocation();

  const handleDetailCard = (lessonId: string | number) => {
    history.push(`${location.pathname}${LESSONS_URL}/${lessonId}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleDetailCard(id!)}
      onKeyPress={() => handleDetailCard(id!)}
      role="button"
      tabIndex={0}
    >
      <Icon icon={COFFEE_ICON} background />
      <div>
        <div className={styles.lesson}>
          {LESSON} {id}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.read}>{readTime}</div>
      </div>
    </div>
  );
}

export default NextCard;
