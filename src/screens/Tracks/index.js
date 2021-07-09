import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../contexts/app";
import LessonCard from "../../components/LessonCard";
import { LESSONS, TOKEN, TRACKS } from "../../constants";
import Nav from "../../components/Nav";
import Slider from "../../components/Slider";
import styles from "./Tracks.module.scss";
import TrackCard from "../../components/TrackCard";

function Tracks() {
  const history = useHistory();
  const { selectors, services } = useApp();

  useEffect(() => {
    const getItems = async () => {
      if (!localStorage.getItem(TOKEN)) {
        return history.push("/");
      }

      if (!localStorage.getItem(TRACKS)) {
        return services.setTracks();
      }

      await services.getTracks();
      // await services.getFurthestLesson();
    };

    getItems();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Nav />
      <div>
        <h2>Tracks</h2>
        {selectors &&
          selectors.tracks &&
          selectors.tracks.map((item) => <TrackCard track={item} />)}
      </div>
      <Slider>
        <div>Slider</div>
      </Slider>
    </div>
  );
}

export default Tracks;
