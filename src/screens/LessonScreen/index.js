import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useApp } from '../../contexts/app';
import { LESSONS_URL, TRACKS_URL } from '../../constants';
import styles from './Lesson.module.scss';
import Lesson from '../../components/Lesson';
import tracks from '../../data/tracks';

function LessonScreen() {
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState('');
  const history = useHistory();
  const { slug, lessonId } = useParams();

  const nextLesson = parseInt(lessonId) + 1;

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
          id={lessonId}
          markdown={markdown}
          checkNextLesson={checkNextLesson}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default LessonScreen;
