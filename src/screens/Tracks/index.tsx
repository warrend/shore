import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { TOKEN } from '../../constants';
import Nav from '../../components/Nav';
import styles from './Tracks.module.scss';
import TrackCard from '../../components/TrackCard';
import Menu from '../../components/Menu';
// import { useApp } from '../../contexts/app';
import { TrackData } from '../../sharedTypes';
import localServices from '../../services/localServices';

function Tracks() {
  const [tracks, setTracks] = useState<TrackData[]>([]);

  useEffect(() => {
    const res = localServices.getTracks();
    setTracks(res);

    return () => {};
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.wrapper}>
        <h2>Tracks</h2>
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
