import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LessonCard from '../../components/LessonCard';
import { ARROW_LEFT, LESSONS_COPY, TRACKS_URL } from '../../constants';
import styles from './TrackScreen.module.scss';
import NextCard from '../../components/NextCard';
import Icon from '../../components/Icon';
import { LessonData, Params, TLesson, TrackData } from '../../sharedTypes';
import localServices from '../../services/localServices';
import { useApp } from '../../contexts/app';
import useTransition from '../../utils/useTransition';
import clickTransition from '../../utils/clickTransition';
import Wrapper from '../../layout/Wrapper';

function TrackScreen() {
  const {
    services: { changeLoadingState },
  } = useApp();
  const [track, setTrack] = useState<TrackData>();
  const [next, setNext] = useState<TLesson>();
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();
  const { slug } = useParams<Params>() || '';

  useTransition();

  useEffect(() => {
    const getData = async () => {
      changeLoadingState(true);
      if (slug) {
        const res = localServices.getTrack(slug);
        if (res.lessons !== undefined) {
          const nextLesson: TLesson = await localServices.getNextLesson(slug);
          setNext(nextLesson);
          setTrack(res);
        } else {
          setError(true);
        }
      }
      changeLoadingState(false);
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
          <NextCard
            lesson={next.lesson!}
            readTime={next?.readTime!}
            track={track!}
          />
        </div>
      </div>
    ) : null;

  const handleGoBack = () => {
    clickTransition(() => history.push(TRACKS_URL));
  };

  return (
    <div>
      <div className={styles.nav}>
        <Icon icon={ARROW_LEFT} onClick={handleGoBack} />
      </div>
      <Wrapper>
        {!error ? (
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
                  <LessonCard lesson={item} key={item.id} />
                ))}
            </div>
          </div>
        ) : (
          <div>No track.</div>
        )}
      </Wrapper>
    </div>
  );
}

export default TrackScreen;
