import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  GO_BACK_BUTTON,
  LESSONS_URL,
  TRACKS_URL,
  LAST_LESSON_MESSAGE,
} from '../../constants';
import styles from './Lesson.module.scss';
import Lesson from '../../components/Lesson';
import Button from '../../components/interactions/Button';
import { LessonData, Params, TLesson } from '../../sharedTypes';
import Slider from '../../components/Slider';
import localServices from '../../services/localServices';
import { useApp } from '../../contexts/app';

function LessonScreen() {
  const [lesson, setLesson] = useState<LessonData>();
  const [markdown, setMarkdown] = useState<string>('');
  const [readTime, setReadTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const {
    services: { changeSliderState },
    selectors,
  } = useApp();
  const history = useHistory();
  const { slug, lessonId } = useParams<Params>();

  const nextLesson = parseInt(lessonId!, 10) + 1;

  useEffect(() => {
    const getData = async () => {
      if (slug && lessonId) {
        const res = await localServices.getLesson(slug, lessonId);

        setLesson(res.lesson);
        setMarkdown(res.markdown);
        setReadTime(res.readTime);
        setLoading(false);
      }
    };

    getData();
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

  const handleFinishLesson = async () => {
    const res: TLesson = await localServices.finishLesson(slug!, lessonId!);
    setLesson(res?.lesson);
  };

  const handleRemoveFinishedLesson = async () => {
    const res: TLesson = await localServices.removeFinishedLesson(
      slug!,
      lessonId!
    );

    setLesson(res?.lesson);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {!loading ? (
          <Lesson
            handleFinishLesson={handleFinishLesson}
            handleGoBack={handleGoBack}
            handleRemoveFinishedLesson={handleRemoveFinishedLesson}
            lesson={lesson!}
            markdown={markdown!}
            readTime={readTime}
            checkNextLesson={checkNextLesson}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Slider>
        <div>
          <div>{LAST_LESSON_MESSAGE}</div>
          <Button name={GO_BACK_BUTTON} onClick={handleGoBack} />
        </div>
      </Slider>
    </>
  );
}

export default LessonScreen;
