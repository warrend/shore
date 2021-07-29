import React from 'react';
import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.inner} />
    </div>
  );
}

export default Loader;
