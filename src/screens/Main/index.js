import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import LessonCard from "../../components/LessonCard";
import { LESSONS, TOKEN } from "../../constants";
import Nav from "../../components/Nav";
import Slider from "../../components/Slider";
import styles from "./Main.module.scss";
import NextCard from "../../components/NextCard";

function Main() {
  const history = useHistory();
  const { selectors, services } = useApp();

  useEffect(() => {
    if (!localStorage.getItem(TOKEN)) {
      return history.push("/");
    }

    if (!localStorage.getItem(LESSONS)) {
      return services.setLessons();
    }

    services.getLessons();
    services.getFurthestLesson();
  }, []);

  const renderNextLesson = () => {
    if (!selectors.nextUp) {
      return null;
    }
    if (selectors.nextUp >= selectors.lessons.length) {
      return (
        <div className={styles.section}>
          <h2>Next up</h2>
          <div>You have finished the last lesson.</div>
        </div>
      );
    }

    return (
      <div className={styles.section}>
        <h2>Next up</h2>
        <div>
          <NextCard lesson={selectors.lessons[selectors.nextUp]} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Nav />
      <div>
        {renderNextLesson()}
        <h2>Lessons</h2>
        {selectors &&
          selectors.lessons &&
          selectors.lessons.map((item) => <LessonCard lesson={item} />)}
      </div>
      <Slider>
        <div>Slider</div>
      </Slider>
    </div>
  );
}

export default Main;
