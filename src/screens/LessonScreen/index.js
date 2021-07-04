import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import useLesson from "../../utils/useLesson";
import { LESSONS_URL, SLIDER_MESSAGE_ALL_COMPLETE } from "../../constants";
import styles from "./Lesson.module.scss";
import Lesson from "../../components/Lesson";
import useMarkdown from "utils/useMarkdown";
import NoLesson from "../../components/NoLesson";
import Slider from "components/Slider";

function LessonScreen() {
  const {
    selectors: { currentLesson, lessons },
    services: { changeSliderState },
  } = useApp();

  const { id } = useParams();
  useLesson(id);
  const history = useHistory();
  const markdown = useMarkdown(id);
  const nextLesson = parseInt(id) + 1;

  const checkNextLesson = () => {
    const allLessons = lessons;

    if (nextLesson > allLessons.length) {
      return changeSliderState(true);
    }

    history.push(`${LESSONS_URL}/${nextLesson}`);
  };

  return (
    <div className={styles.wrapper}>
      {!currentLesson ? (
        <NoLesson />
      ) : (
        <Lesson id={id} markdown={markdown} checkNextLesson={checkNextLesson} />
      )}
      <Slider>
        <div>{SLIDER_MESSAGE_ALL_COMPLETE}</div>
      </Slider>
    </div>
  );
}

export default LessonScreen;
