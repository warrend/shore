import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useMarkdown() {
  const [lesson, setLesson] = useState("");
  const { selectors } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      const path = selectors.lessons[selectors.user.currentLesson].path;
      const file = await import(`../data/${path}`);
      const res = await fetch(file.default);
      const markdownFile = await res.text();
      setLesson(markdownFile);
    };

    getLesson();
  }, []);

  return lesson;
}

export default useMarkdown;
