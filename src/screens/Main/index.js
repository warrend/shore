import React from "react";
import { useApp } from "../../contexts/app";
import LessonCard from "../../components/LessonCard";

function Main() {
  const { selectors } = useApp();
  // const lesson = useMarkdown();
  const lessonArray = Object.keys(selectors.lessons);

  return (
    <div>
      Main page
      {lessonArray.map((item) => (
        <LessonCard lesson={selectors.lessons[item]} />
      ))}
    </div>
  );
}

export default Main;
