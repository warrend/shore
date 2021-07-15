import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TOKEN } from '../../constants';
import Nav from '../../components/Nav';
import styles from './Tracks.module.scss';
import TrackCard from '../../components/TrackCard';
import tracks from '../../data/tracks';

function Tracks() {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem(TOKEN)) {
      return history.push('/');
    }

    return () => {};
  }, []);

  return (
    <div className={styles.wrapper}>
      <Nav />
      <div>
        <h2>Tracks</h2>
        {tracks && tracks.map((item) => <TrackCard track={item} />)}
      </div>
    </div>
  );
}

export default Tracks;
