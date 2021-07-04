import React from "react";
import ReactMarkdown from "react-markdown";
import { useHistory, useParams } from "react-router";
import { useApp } from "contexts/app";
import useMarkdown from "../../utils/useMarkdown";

import {
  LESSONS_URL,
  BACK_BUTTON,
  NEXT_BUTTON,
  FINISH_LESSON_BUTTON,
  UNFINISH_LESSON_BUTTON,
} from "../../constants";

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

  console.log(context.selectors.currentLesson);

  return (
    <div>
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
