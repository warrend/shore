import React from 'react';
import styles from './Wrapper.module.scss';

type WrapperProps = {
  children: React.ReactNode;
};

function Wrapper({ children }: WrapperProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Wrapper;
