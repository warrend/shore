import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useMarkdown(slug, lessonId) {
  const [lesson, setLesson] = useState("");
  const { selectors, services } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      await services.getTrackBySlug(slug);
      const path = selectors.lessons.find((item) => `${item.id}` === lessonId);
      if (!path) {
        return;
      }
      const file = await import(`../data/tracks/${slug}/${path.path}`);
      const res = await fetch(file.default);
      const markdownFile = await res.text();
      setLesson(markdownFile);
    };

    getLesson();
  }, []);

  return lesson;
}

export default useMarkdown;
