import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import LessonCard from "../../components/LessonCard";
import { LESSONS, TOKEN } from "../../constants";

function Main() {
  const history = useHistory();
  const {
    selectors,
    services: { getData, setLessons },
  } = useApp();

  useEffect(() => {
    if (!localStorage.getItem(TOKEN)) {
      history.push("/");
    }

    if (!localStorage.getItem(LESSONS)) {
      setLessons();
    }
  }, []);

  return (
    <div>
      Main page
      {selectors.lessons &&
        selectors.lessons.map((item) => <LessonCard lesson={item} />)}
    </div>
  );
}

export default Main;
