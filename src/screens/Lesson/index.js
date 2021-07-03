import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useApp } from "../../contexts/app";
import useMarkdown from "../../utils/useMarkdown";
import useLesson from "../../utils/useLesson";
import {
  LESSONS_URL,
  BACK_BUTTON,
  NEXT_BUTTON,
  FINISH_LESSON_BUTTON,
  UNFINISH_LESSON_BUTTON,
} from "../../constants";
import styles from "./Lesson.module.scss";

function Lesson() {
  const context = useApp();
  const [isCompleted, setIsCompleted] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useLesson(id);

  const markdown = useMarkdown(id);
  const nextLesson = parseInt(id) + 1;

  const checkNextLesson = () => {
    const allLessons = context.selectors.lessons;

    if (nextLesson > allLessons.length) {
      return console.log("Last lesson");
    }

    history.push(`${LESSONS_URL}/${nextLesson}`);
  };

  const handleGoBack = () => {
    history.push(LESSONS_URL);
  };

  const handleFinishLesson = () => {
    context.services.updateFinishedLessons(id);
    // checkNextLesson();
  };

  const handleRemoveFinishedLesson = () => {
    context.services.removeFinishedLesson(id);
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handleGoBack}>{BACK_BUTTON}</button>
      <button onClick={checkNextLesson}>{NEXT_BUTTON}</button>
      <button
        onClick={
          context.selectors.currentLesson.isCompleted
            ? handleRemoveFinishedLesson
            : handleFinishLesson
        }
      >
        {context.selectors.currentLesson.isCompleted
          ? UNFINISH_LESSON_BUTTON
          : FINISH_LESSON_BUTTON}
      </button>
      <ReactMarkdown children={markdown} />
    </div>
  );
}

export default Lesson;
