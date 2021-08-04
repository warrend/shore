import React from 'react';
import cn from 'classnames';
import styles from './Switch.module.scss';

type SwitchProps = {
  onChange?: (
    // eslint-disable-next-line no-unused-vars
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  label?: string;
};

function Switch({ onChange, label }: SwitchProps) {
  const toggleClass = cn({
    [styles.slider]: true,
    [styles.round]: true,
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.border}>
        <label className={styles.switch} htmlFor="switch">
          <input type="checkbox" id="switch" onChange={onChange} />
          <span className={toggleClass} />
          {label && <p>{label}</p>}
        </label>
      </div>
    </div>
  );
}

export default Switch;
