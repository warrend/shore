import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import useLesson from "../../utils/useLesson";
import { LESSONS_URL, TRACKS_URL } from "../../constants";
import styles from "./Lesson.module.scss";
import Lesson from "../../components/Lesson";
import useMarkdown from "utils/useMarkdown";
import NoLesson from "../../components/NoLesson";

function LessonScreen() {
  const {
    selectors: { currentLesson, lessons, markdown },
    services: { changeSliderState, getMarkdown, getTrackBySlug },
  } = useApp();

  const { slug, lessonId } = useParams();
  useEffect(() => {
    const pageInit = async () => {
      await getTrackBySlug(slug);
      await getMarkdown(slug, lessonId);
    };

    pageInit();
  }, [lessonId, slug]);

  const history = useHistory();
  const nextLesson = parseInt(lessonId) + 1;

  const checkNextLesson = () => {
    const allLessons = lessons;

    if (nextLesson > allLessons.length) {
      changeSliderState(true);
      return history.push(TRACKS_URL);
    }

    history.push(`${TRACKS_URL}/${slug}${LESSONS_URL}/${nextLesson}`);
  };

  return (
    <div className={styles.wrapper}>
      {!currentLesson ? (
        <NoLesson />
      ) : (
        <Lesson
          id={lessonId}
          markdown={markdown}
          checkNextLesson={checkNextLesson}
        />
      )}
    </div>
  );
}

export default LessonScreen;
