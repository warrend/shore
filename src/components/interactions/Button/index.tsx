import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  name: string;
  onClick: () => void;
  secondary: boolean;
};

function Button({ name, onClick, secondary }: Props) {
  const btnClass = cn({
    [styles.button]: true,
    [styles.alternate]: secondary,
  });

  return (
    <button onClick={onClick} className={btnClass} type="button">
      {name}
    </button>
  );
}

export default Button;
