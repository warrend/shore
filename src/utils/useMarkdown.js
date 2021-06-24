import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useMarkdown(id) {
  const [lesson, setLesson] = useState("");
  const { selectors } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      // const path = selectors.lessons[id].path;
      const path = selectors.lessons.find((item) => `${item.id}` === id);
      console.log("path", path);
      const file = await import(`../data/${path.path}`);
      const res = await fetch(file.default);
      const markdownFile = await res.text();
      setLesson(markdownFile);
    };

    getLesson();
  }, [id]);

  return lesson;
}

export default useMarkdown;
