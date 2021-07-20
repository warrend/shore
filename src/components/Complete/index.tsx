import React from 'react';
import Icon from '../Icon';
import styles from './Complete.module.scss';

function Complete() {
  return (
    <div className={styles.wrapper}>
      <Icon icon="check" readonly />
    </div>
  );
}

export default Complete;
