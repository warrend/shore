import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import { LESSONS_URL, TRACKS_URL } from "../../constants";
import styles from "./Lesson.module.scss";
import Lesson from "../../components/Lesson";
import tracks from "../../data/tracks";

function LessonScreen() {
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState("");
  const history = useHistory();
  const { slug, lessonId } = useParams();

  const nextLesson = parseInt(lessonId) + 1;

  const {
    services: { changeSliderState, getLesson },
    selectors,
  } = useApp();

  useEffect(() => {
    getLesson(slug, lessonId);
    setLoading(false);
  }, []);

  console.log("lesson...", selectors.lesson);

  // useEffect(() => {
  //   const getLesson = async () => {
  //     const track = tracks.find((item) => item.path === slug);
  //     setTrackId(track.id);
  //     const finished = await services.getFinished(track.id);
  //     setCurrentTrack(track);
  //     const trackLesson = track.lessons.lessons.find(
  //       (item) => `${item.id}` === lessonId
  //     );

  //     const updatedTrackLesson = checkIfCompleted(
  //       trackLesson,
  //       finished,
  //       track.slugId
  //     );

  //     if (!trackLesson) {
  //       return history.push(`${TRACKS_URL}/${slug}`);
  //     }

  //     const file = await import(
  //       `../../data/tracks/${slug}/${trackLesson.path}`
  //     );
  //     const res = await fetch(file.default);
  //     const markdownFile = await res.text();

  //     setMarkdown(markdownFile);
  //     setLesson(updatedTrackLesson);
  //   };

  //   getLesson();
  //   setLoading(false);
  // }, [lessonId, slug]);

  const checkNextLesson = () => {
    // const allLessons = currentTrack.lessons.lessons;

    // if (nextLesson > allLessons.length) {
    //   changeSliderState(true);
    //   return history.push(TRACKS_URL);
    // }

    history.push(`${TRACKS_URL}/${slug}${LESSONS_URL}/${nextLesson}`);
  };

  const handleGoBack = () => {
    history.push(`${TRACKS_URL}/${slug}`);
  };

  const handleFinishLesson = () => {
    // context.services.updateFinishedLessons(id, trackId);
    // checkNextLesson();
  };

  const handleRemoveFinishedLesson = () => {
    // context.services.removeFinishedLesson(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Lesson
        handleFinishLesson={handleFinishLesson}
        handleGoBack={handleGoBack}
        handleRemoveFinishedLesson={handleRemoveFinishedLesson}
        lesson={selectors.lesson}
        id={lessonId}
        markdown={markdown}
        checkNextLesson={checkNextLesson}
      />
    </div>
  );
}

export default LessonScreen;
