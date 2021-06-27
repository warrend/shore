import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useMarkdown(id) {
  const [lesson, setLesson] = useState("");
  const [done, setDone] = useState(false);
  const { selectors } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      const path = selectors.lessons.find((item) => `${item.id}` === id);
      setDone(path.isCompleted);
      const file = await import(`../data/${path.path}`);
      const res = await fetch(file.default);
      const markdownFile = await res.text();
      setLesson(markdownFile);
    };

    getLesson();
  }, [id]);

  return { markdown: lesson, isCompleted: done };
}

export default useMarkdown;
