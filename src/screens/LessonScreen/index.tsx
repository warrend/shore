import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useApp } from '../../contexts/app';
import {
  GO_BACK_BUTTON,
  LESSONS_URL,
  TRACKS_URL,
  LAST_LESSON_MESSAGE,
} from '../../constants';
import styles from './Lesson.module.scss';
import Lesson from '../../components/Lesson';
import Button from '../../components/interactions/Button';
import { Params } from '../../sharedTypes';
import Slider from '../../components/Slider';

function LessonScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const { slug, lessonId } = useParams<Params>();

  const nextLesson = parseInt(lessonId!, 10) + 1;

  const {
    services: {
      changeSliderState,
      getLesson,
      finishLesson,
      removeFinishedLesson,
    },
    selectors,
  } = useApp();

  useEffect(() => {
    getLesson(slug, lessonId);
    setLoading(false);
  }, [lessonId]);

  const checkNextLesson = () => {
    if (nextLesson > selectors.trackLessonsLength) {
      // history.push(TRACKS_URL);
      // TODO decide where the slider shows when last lesson done
      changeSliderState(true);
      return;
    }

    history.push(`${TRACKS_URL}/${slug}${LESSONS_URL}/${nextLesson}`);
  };

  const handleGoBack = () => {
    history.push(`${TRACKS_URL}/${slug}`);
    changeSliderState(false);
  };

  const handleFinishLesson = () => {
    finishLesson(slug, lessonId);
    // checkNextLesson();
  };

  const handleRemoveFinishedLesson = () => {
    removeFinishedLesson(slug, lessonId);
  };

  return (
    <div className={styles.wrapper}>
      {!loading ? (
        <Lesson
          handleFinishLesson={handleFinishLesson}
          handleGoBack={handleGoBack}
          handleRemoveFinishedLesson={handleRemoveFinishedLesson}
          lesson={selectors.lesson}
          checkNextLesson={checkNextLesson}
        />
      ) : (
        <div>Loading...</div>
      )}
      <Slider>
        <div>
          <div>{LAST_LESSON_MESSAGE}</div>
          <Button name={GO_BACK_BUTTON} onClick={handleGoBack} />
        </div>
      </Slider>
    </div>
  );
}

export default LessonScreen;
