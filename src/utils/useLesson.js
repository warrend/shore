import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useLesson(slug, lessonId) {
  const [lesson, setLesson] = useState("");
  const { selectors, services } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      await services.getTrackBySlug(slug);
      const lesson = selectors.lessons.find((item) => {
        console.log("item", lessonId);
        return item.id === lessonId;
      });
      setLesson(lesson);
    };

    getLesson();
  }, [lessonId]);

  return lesson;
}

export default useLesson;
