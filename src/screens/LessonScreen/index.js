import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import useLesson from "../../utils/useLesson";
import { LESSONS_URL } from "../../constants";
import styles from "./Lesson.module.scss";
import Lesson from "../../components/Lesson";
import useMarkdown from "utils/useMarkdown";
import NoLesson from "../../components/NoLesson";

function LessonScreen() {
  const {
    selectors: { currentLesson, lessons },
    services: { changeSliderState },
  } = useApp();

  const { id } = useParams();
  useLesson(id);
  const history = useHistory();
  const markdown = useMarkdown(id);
  const nextLesson = parseInt(id) + 1;

  const checkNextLesson = () => {
    const allLessons = lessons;

    if (nextLesson > allLessons.length) {
      changeSliderState(true);
      return history.push(LESSONS_URL);
    }

    history.push(`${LESSONS_URL}/${nextLesson}`);
  };

  return (
    <div className={styles.wrapper}>
      {!currentLesson ? (
        <NoLesson />
      ) : (
        <Lesson id={id} markdown={markdown} checkNextLesson={checkNextLesson} />
      )}
    </div>
  );
}

export default LessonScreen;
