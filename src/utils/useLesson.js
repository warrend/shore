import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useLesson(id) {
  const [lesson, setLesson] = useState("");
  const { services } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      const lesson = await services.getLesson(id);
      setLesson(lesson);
    };

    getLesson();
  }, [id]);

  return lesson;
}

export default useLesson;
