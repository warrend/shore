import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import useLesson from "../../utils/useLesson";
import { LESSONS_URL, TRACKS_URL } from "../../constants";
import styles from "./Lesson.module.scss";
import Lesson from "../../components/Lesson";
import useMarkdown from "utils/useMarkdown";
import NoLesson from "../../components/NoLesson";
import tracks from "../../data/tracks";

function LessonScreen() {
  const [lesson, setLesson] = useState(undefined);
  const [markdown, setMarkdown] = useState("");
  const history = useHistory();
  const { slug, lessonId } = useParams();

  const nextLesson = parseInt(lessonId) + 1;

  const {
    services: { changeSliderState },
  } = useApp();

  useEffect(() => {
    const getLesson = async () => {
      const track = tracks.find((item) => item.path === slug);
      const trackLesson = track.lessons.lessons.find(
        (item) => `${item.id}` === lessonId
      );

      const file = await import(
        `../../data/tracks/${slug}/${trackLesson.path}`
      );
      const res = await fetch(file.default);
      const markdownFile = await res.text();

      setMarkdown(markdownFile);
      setLesson(trackLesson);
    };

    getLesson();
  }, [lessonId, slug]);

  // const checkNextLesson = () => {
  //   const allLessons = lessons;

  //   if (nextLesson > allLessons.length) {
  //     changeSliderState(true);
  //     return history.push(TRACKS_URL);
  //   }

  //   history.push(`${TRACKS_URL}/${slug}${LESSONS_URL}/${nextLesson}`);
  // };

  return (
    <div className={styles.wrapper}>
      {!lesson ? (
        <NoLesson />
      ) : (
        <Lesson
          lesson={lesson}
          id={lessonId}
          markdown={markdown}
          // checkNextLesson={checkNextLesson}
        />
      )}
    </div>
  );
}

export default LessonScreen;
