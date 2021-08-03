import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  NEXT_BUTTON,
  FINISH_LESSON_BUTTON,
  UNFINISH_LESSON_BUTTON,
  ARROW_LEFT,
  LAST_LESSON_MESSAGE,
  GO_BACK_BUTTON,
} from '../../constants';
import Button from '../interactions/Button';
import Icon from '../Icon';
import styles from './Lesson.module.scss';
import { LessonData } from '../../sharedTypes';
import Slider from '../Slider';

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
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>

      <div className={styles.content}>
        <div className={styles.read_time}>{readTime}</div>
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
      <Slider>
        <div>
          <div>{LAST_LESSON_MESSAGE}</div>
          <Button name={GO_BACK_BUTTON} onClick={handleGoBack} />
        </div>
      </Slider>
    </div>
  );
}

export default Lesson;
