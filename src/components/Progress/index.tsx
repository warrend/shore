import React from 'react';
import styles from './Progress.module.scss';

type ProgressProps = {
  percentage: number;
};

function Progress({ percentage }: ProgressProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: `${percentage}%` }} />
      </div>
      <div className={styles.percent}>{percentage}%</div>
    </div>
  );
}

export default Progress;
