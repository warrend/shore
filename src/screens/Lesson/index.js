import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useApp } from "../../contexts/app";
import useMarkdown from "../../utils/useMarkdown";

function Lesson() {
  const { services, selectors } = useApp();
  const history = useHistory();
  const { id } = useParams();
  const lesson = useMarkdown(id);
  const nextLesson = parseInt(id) + 1;

  const checkNextLesson = () => {
    const allLessons = Object.keys(selectors.lessons);

    if (nextLesson > allLessons.length) {
      return console.log("Last lesson");
    }

    history.push(`/main/lesson/${nextLesson}`);
  };

  const handleGoBack = () => {
    history.push("/main");
  };

  const handleFinishLesson = () => {
    services.updateFinishedLessons(id);
    checkNextLesson();
  };

  return (
    <div>
      <button onClick={handleGoBack}>BACK</button>
      <button onClick={handleFinishLesson}>Next</button>
      <ReactMarkdown children={lesson} />
    </div>
  );
}

export default Lesson;
