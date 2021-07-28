import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../components/Nav';
import styles from './Tracks.module.scss';
import TrackCard from '../../components/TrackCard';
import Menu from '../../components/Menu';
import { TrackData } from '../../sharedTypes';
import localServices from '../../services/localServices';
import { TRACKS_HEADER_COPY } from '../../constants';
import { useApp } from '../../contexts/app';

function Tracks() {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const history = useHistory();
  const {
    selectors: { token },
  } = useApp();

  useEffect(() => {
    if (token === 'show-welcome' || token === null) {
      return history.push('/welcome');
    }

    const res = localServices.getTracks();
    setTracks(res);

    return () => {};
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.wrapper}>
        <h2>{TRACKS_HEADER_COPY}</h2>
        <div className={styles.content}>
          {tracks &&
            tracks.map((item: TrackData) => <TrackCard track={item} />)}
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default Tracks;
