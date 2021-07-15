import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../../contexts/app';
import {
  NEXT_BUTTON,
  FINISH_LESSON_BUTTON,
  UNFINISH_LESSON_BUTTON,
  ARROW_LEFT,
} from '../../constants';
import Button from '../interactions/Button';
import Icon from '../Icon';
import styles from './Lesson.module.scss';
import { LessonData } from '../../sharedTypes';

type Props = {
  checkNextLesson: () => void;
  lesson: LessonData;
  handleGoBack: () => void;
  handleFinishLesson: () => void;
  handleRemoveFinishedLesson: () => void;
};

function Lesson({
  checkNextLesson,
  lesson,
  handleGoBack,
  handleFinishLesson,
  handleRemoveFinishedLesson,
}: Props) {
  const { selectors } = useApp();

  return (
    <div>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div className={styles.content}>
        <ReactMarkdown>{selectors.markdown}</ReactMarkdown>
      </div>

      <div className={styles.buttons}>
        <Button
          onClick={
            lesson && lesson.isCompleted
              ? handleRemoveFinishedLesson
              : handleFinishLesson
          }
          name={
            lesson && lesson.isCompleted
              ? UNFINISH_LESSON_BUTTON
              : FINISH_LESSON_BUTTON
          }
        />
        <Button onClick={checkNextLesson} name={NEXT_BUTTON} secondary />
      </div>
    </div>
  );
}

export default Lesson;
