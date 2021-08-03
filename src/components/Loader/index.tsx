import React from 'react';
import cn from 'classnames';
import { useApp } from '../../contexts/app';
import styles from './Loader.module.scss';

function Loader() {
  const {
    selectors: { loading },
  } = useApp();

  const loaderClass = cn({
    [styles.loader]: true,
    [styles.on]: loading,
  });

  return (
    <div className={loaderClass}>
      <div className={styles.inner} />
    </div>
  );
}

export default Loader;
