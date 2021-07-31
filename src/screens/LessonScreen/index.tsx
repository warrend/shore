import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  GO_BACK_BUTTON,
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
  const [lessonCount, setLessonCount] = useState<number | null>();
  const [error, setError] = useState<boolean>(false);

  const {
    services: { changeSliderState, changeLoadingState },
  } = useApp();

  const history = useHistory();
  const { slug, lessonId } = useParams<Params>();

  const nextLesson = parseInt(lessonId!, 10) + 1;

  useEffect(() => {
    const getData = async () => {
      changeLoadingState(true);

      if (slug && lessonId) {
        const res = await localServices.getLesson(slug, lessonId);
        const count = localServices.getLessonCount(slug);

        if (res !== undefined) {
          setLesson(res.lesson);
          setMarkdown(res.markdown);
          setReadTime(res.readTime);
          setLessonCount(count);
        } else {
          setError(true);
        }
      }
      changeLoadingState(false);
    };

    getData();
  }, [lessonId]);

  const checkNextLesson = () => {
    if (parseInt(lessonId!, 10) + 1 <= lessonCount!) {
      return history.push(`${TRACKS_URL}/${slug}/lessons/${nextLesson}`);
    }

    return changeSliderState(true);
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
        {!error ? (
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
          <div>
            Sorry, this lesson does not exist. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Doloribus eligendi commodi numquam eum
            voluptates at voluptatum enim, dolor nulla dolores dolorum nisi.
            Repudiandae velit, voluptates laudantium impedit numquam cupiditate
            perferendis.
          </div>
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
