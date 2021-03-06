import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ARROW_LEFT, TRACKS_URL } from '../../constants';
import Lesson from '../../components/Lesson';
import { LessonData, Params, TLesson } from '../../sharedTypes';
import localServices from '../../services/localServices';
import { useApp } from '../../contexts/app';
import useTransition from '../../utils/useTransition';
import clickTransition from '../../utils/clickTransition';
import styles from './Lesson.module.scss';
import Wrapper from '../../layout/Wrapper';
import Icon from '../../components/Icon';

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

  useTransition(lessonId);

  const checkNextLesson = () => {
    if (parseInt(lessonId!, 10) + 1 <= lessonCount!) {
      return clickTransition(() =>
        history.push(`${TRACKS_URL}/${slug}/lessons/${nextLesson}`)
      );
    }

    return changeSliderState(true);
  };

  const handleGoBack = () => {
    clickTransition(() => history.push(`${TRACKS_URL}/${slug}`));
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
    <div>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div className={styles.wrapper}>
        <Wrapper>
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
              consectetur adipisicing elit. Doloribus eligendi commodi numquam
              eum voluptates at voluptatum enim, dolor nulla dolores dolorum
              nisi. Repudiandae velit, voluptates laudantium impedit numquam
              cupiditate perferendis.
            </div>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

export default LessonScreen;
