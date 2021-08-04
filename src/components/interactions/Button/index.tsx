import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  name: string;
  onClick: () => void;
  secondary?: boolean;
  warning?: boolean;
};

function Button({ name, onClick, secondary, warning }: Props) {
  const btnClass = cn({
    [styles.button]: true,
    [styles.alternate]: secondary,
    [styles.warning]: warning,
  });

  return (
    <button onClick={onClick} className={btnClass} type="button">
      {name}
    </button>
  );
}

export default Button;
