import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useApp } from "../../contexts/app";
import LessonCard from "../../components/LessonCard";
import { ARROW_LEFT, TOKEN, TRACKS_URL } from "../../constants";
import Nav from "../../components/Nav";
import Slider from "../../components/Slider";
import styles from "./TrackScreen.module.scss";
import NextCard from "../../components/NextCard";
import tracks from "../../data/tracks";
import Icon from "../../components/Icon";

function TrackScreen() {
  const history = useHistory();
  const { slug } = useParams();
  const [selectedTrack, setSelectedTrack] = useState(undefined);
  const { selectors, services } = useApp();

  const track = selectors.tracks.find((track) => track.path === slug);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN)) {
      return history.push("/");
    }
  }, []);

  // const renderNextLesson = () => {
  //   if (selectors.nextUp >= selectors.lessons.length) {
  //     return (
  //       <div className={styles.section}>
  //         <h2>Next up</h2>
  //         <div>You have finished the last lesson.</div>
  //       </div>
  //     );
  //   }

  //   if (selectors.lessons.length) {
  //     return (
  //       <div className={styles.section}>
  //         <h2>Next up</h2>
  //         <div>
  //           <NextCard lesson={selectors.lessons[selectors.nextUp || 0]} />
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  // TODO - add protection for unhappy path

  const handleGoBack = () => {
    history.push(TRACKS_URL);
  };

  return (
    <div className={styles.wrapper}>
      {/* <Nav /> */}
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div>
        {/* {renderNextLesson()} */}
        <h2>Lessons</h2>
        {track.lessons &&
          track.lessons.map((item) => <LessonCard lesson={item} />)}
      </div>
      <Slider>
        <div>Slider</div>
      </Slider>
    </div>
  );
}

export default TrackScreen;
