import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useApp } from "../../contexts/app";
import useMarkdown from "../../utils/useMarkdown";
import { LESSONS_URL, BACK_BUTTON, NEXT_BUTTON } from "../../constants";

function Lesson() {
  const { services, selectors } = useApp();
  const history = useHistory();
  const { id } = useParams();
  const lesson = useMarkdown(id);
  const nextLesson = parseInt(id) + 1;

  const checkNextLesson = () => {
    const allLessons = selectors.lessons;

    if (nextLesson > allLessons.length) {
      return console.log("Last lesson");
    }

    history.push(`${LESSONS_URL}/${nextLesson}`);
  };

  const handleGoBack = () => {
    history.push(LESSONS_URL);
  };

  const handleFinishLesson = () => {
    services.updateFinishedLessons(id);
    checkNextLesson();
  };

  return (
    <div>
      <button onClick={handleGoBack}>{BACK_BUTTON}</button>
      <button onClick={handleFinishLesson}>{NEXT_BUTTON}</button>
      <ReactMarkdown children={lesson} />
    </div>
  );
}

export default Lesson;
