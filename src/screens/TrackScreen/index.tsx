import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { useApp } from '../../contexts/app';
import LessonCard from '../../components/LessonCard';
import { ARROW_LEFT, TRACKS_URL, LESSONS_COPY } from '../../constants';
import Slider from '../../components/Slider';
import styles from './TrackScreen.module.scss';
// import NextCard from '../../components/NextCard';
// import tracks from '../../data/tracks';
import Icon from '../../components/Icon';
import { LessonData, Params, TrackData } from '../../sharedTypes';
import localServices from '../../services/localServices';

function TrackScreen() {
  const [track, setTrack] = useState<TrackData>();
  const history = useHistory();
  const { slug } = useParams<Params>() || '';
  // const [selectedTrack, setSelectedTrack] = useState(undefined);
  // const { selectors } = useApp();

  // const track =
  //   selectors.tracks &&
  //   selectors.tracks.find((t: TrackData) => t.path === slug);

  useEffect(() => {
    const getData = async () => {
      if (slug) {
        const res = localServices.getTrack(slug);
        const test = await localServices.getNextLesson(slug);
        console.log('test', test);
        setTrack(res);
      }
    };

    getData();
    return () => {};
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
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div className={styles.content}>
        {/* {renderNextLesson()} */}
        <div>
          <div className={styles.header}>
            <h2>
              {track?.title} {LESSONS_COPY}
            </h2>
          </div>
          {track &&
            track?.lessons?.map((item: LessonData) => (
              <LessonCard lesson={item} />
            ))}
        </div>
      </div>
      <Slider>
        <div>Slider</div>
      </Slider>
    </div>
  );
}

export default TrackScreen;
