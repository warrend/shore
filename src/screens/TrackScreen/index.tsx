import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LessonCard from '../../components/LessonCard';
import { ARROW_LEFT, LESSONS_COPY, TRACKS_URL } from '../../constants';
import Slider from '../../components/Slider';
import styles from './TrackScreen.module.scss';
import NextCard from '../../components/NextCard';
// import tracks from '../../data/tracks';
import Icon from '../../components/Icon';
import { LessonData, Params, TLesson, TrackData } from '../../sharedTypes';
import localServices from '../../services/localServices';

function TrackScreen() {
  const [track, setTrack] = useState<TrackData>();
  const [next, setNext] = useState<TLesson>();
  const history = useHistory();
  const { slug } = useParams<Params>() || '';

  useEffect(() => {
    const getData = async () => {
      if (slug) {
        const res = localServices.getTrack(slug);
        const nextLesson: TLesson = await localServices.getNextLesson(slug);
        setNext(nextLesson);
        setTrack(res);
      }
    };

    getData();

    return () => {};
  }, []);

  // eslint-disable-next-line no-confusing-arrow
  const renderNextLesson = () =>
    next ? (
      <div className={styles.section}>
        <h2>Next up</h2>
        <div>
          <NextCard lesson={next.lesson!} readTime={next?.readTime!} />
        </div>
      </div>
    ) : null;

  const handleGoBack = () => {
    history.push(TRACKS_URL);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <div className={styles.content}>
        {renderNextLesson()}
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
