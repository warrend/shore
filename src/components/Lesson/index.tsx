import React from 'react';
import ReactMarkdown from 'react-markdown';
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
  markdown: string;
  readTime: string;
};

function Lesson({
  checkNextLesson,
  lesson,
  markdown,
  handleGoBack,
  handleFinishLesson,
  handleRemoveFinishedLesson,
  readTime,
}: Props) {
  return (
    <div>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      {readTime}
      <div className={styles.content}>
        <ReactMarkdown>{markdown}</ReactMarkdown>

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
    </div>
  );
}

export default Lesson;
