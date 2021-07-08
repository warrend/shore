import React from "react";
import ReactMarkdown from "react-markdown";
import { useHistory, useParams } from "react-router";
import { useApp } from "contexts/app";
import {
  LESSONS_URL,
  BACK_BUTTON,
  NEXT_BUTTON,
  FINISH_LESSON_BUTTON,
  UNFINISH_LESSON_BUTTON,
  ARROW_LEFT,
} from "../../constants";
import Button from "../../components/interactions/Button";
import Icon from "../../components/Icon";
import styles from "./Lesson.module.scss";

function Lesson({ id, markdown, checkNextLesson }) {
  const history = useHistory();
  const context = useApp();

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

  return (
    <div>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div className={styles.content}>
        <ReactMarkdown children={markdown} />
      </div>

      <div className={styles.buttons}>
        <Button
          onClick={
            context.selectors.currentLesson.isCompleted
              ? handleRemoveFinishedLesson
              : handleFinishLesson
          }
          name={
            context.selectors.currentLesson.isCompleted
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
