import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  name: string;
  onClick: () => void;
  secondary?: boolean;
  warning?: boolean;
  disabled?: boolean;
};

function Button({ name, onClick, secondary, warning, disabled }: Props) {
  const btnClass = cn({
    [styles.button]: true,
    [styles.alternate]: secondary,
    [styles.warning]: warning,
    [styles.disabled]: disabled,
  });

  return (
    <button
      onClick={onClick}
      className={btnClass}
      type="button"
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default Button;
