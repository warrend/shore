import React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';
import { iconMap } from '../icons';

type Props = {
  onClick?: () => void;
  icon: string;
  background?: boolean;
};

function Icon({ onClick, icon, background }: Props) {
  const iconClass = cn({
    [styles.wrapper]: true,
    [styles.background]: background,
  });

  return (
    <div
      className={iconClass}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={onClick}
    >
      <img src={iconMap[icon]} alt="icon" className={styles.custom} />
    </div>
  );
}

export default Icon;
