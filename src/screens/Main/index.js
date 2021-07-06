import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import LessonCard from "../../components/LessonCard";
import { LESSONS, TOKEN } from "../../constants";
import Nav from "../../components/Nav";

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
  }, []);

  console.log(selectors);

  return (
    <div>
      <Nav />
      <div>
        Main page
        {selectors &&
          selectors.lessons &&
          selectors.lessons.map((item) => <LessonCard lesson={item} />)}
      </div>
    </div>
  );
}

export default Main;
