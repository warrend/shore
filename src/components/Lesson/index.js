import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory, useParams } from 'react-router';
import { useApp } from '../../contexts/app';
import {
  NEXT_BUTTON,
  FINISH_LESSON_BUTTON,
  UNFINISH_LESSON_BUTTON,
  ARROW_LEFT,
} from '../../constants';
import Button from '../../components/interactions/Button';
import Icon from '../../components/Icon';
import styles from './Lesson.module.scss';

function Lesson({
  checkNextLesson,
  lesson,
  handleGoBack,
  handleFinishLesson,
  handleRemoveFinishedLesson,
}) {
  const { selectors } = useApp();

  return (
    <div>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div className={styles.content}>
        <ReactMarkdown children={selectors.markdown} />
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
