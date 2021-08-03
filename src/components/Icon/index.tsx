import React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';
import { iconMap } from '../icons';
import { DEFAULT_ICON } from '../../constants';

type Props = {
  onClick?: () => void;
  icon: string;
  background?: boolean;
  readonly?: boolean;
  backgroundColor?: string;
  randomize?: boolean;
};

function Icon({
  onClick,
  icon,
  background,
  readonly,
  backgroundColor,
  randomize,
}: Props) {
  const iconClass = cn({
    [styles.wrapper]: true,
    [styles.background]: background,
    [styles.readonly]: readonly,
  });

  const randomColor = () => {
    const hue = Math.floor(Math.random() * 361);

    return `hsl(${hue}, 50%, 95%)`;
  };

  return (
    <div
      className={iconClass}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={onClick}
      style={{ background: randomize ? randomColor() : backgroundColor }}
    >
      <img
        src={iconMap[icon] ? iconMap[icon] : iconMap[DEFAULT_ICON]}
        alt="icon"
        className={styles.custom}
      />
    </div>
  );
}

export default Icon;
