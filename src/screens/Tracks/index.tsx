import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from './Tracks.module.scss';
import TrackCard from '../../components/TrackCard';
import Menu from '../../components/Menu';
import { TrackData } from '../../sharedTypes';
import localServices from '../../services/localServices';
import { CONTINUE_COPY, TRACKS_HEADER_COPY } from '../../constants';
import { useApp } from '../../contexts/app';
import NextCard from '../../components/NextCard';
import useTransition from '../../utils/useTransition';
import Wrapper from '../../layout/Wrapper';
// import { TLastFinished } from '../../data';

function Tracks() {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [next, setNext] = useState<any>();
  const history = useHistory();
  const {
    selectors: { token },
  } = useApp();

  useTransition();

  useEffect(() => {
    const getData = async () => {
      if (token === 'show-welcome' || token === null) {
        return history.push('/welcome');
      }
      const nxt = await localServices.getContinueTrack();

      const res = localServices.getTracks();
      setTracks(res);
      return setNext(nxt);
    };

    getData();

    return () => {};
  }, []);

  return (
    <div>
      <Nav />
      <Wrapper>
        {next && next.track !== '' && (
          <>
            <h2>{CONTINUE_COPY}</h2>
            <NextCard
              lesson={next.lesson.lesson}
              readTime={next.lesson.readTime}
              track={next.track}
            />
          </>
        )}
        <h2>{TRACKS_HEADER_COPY}</h2>
        <div className={styles.content}>
          {tracks &&
            tracks.map((item: TrackData) => (
              <TrackCard key={item.id} track={item} />
            ))}
        </div>
      </Wrapper>
      <Menu />
    </div>
  );
}

export default Tracks;
