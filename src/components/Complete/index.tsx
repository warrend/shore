import React from 'react';
import cn from 'classnames';
import Icon from '../Icon';
import styles from './Complete.module.scss';
import { CHECK_ICON, CHECK_DISABLED_ICON } from '../../constants';

type CompleteProps = {
  complete: boolean | undefined;
};

function Complete({ complete }: CompleteProps) {
  const completeClasses = cn({
    [styles.wrapper]: true,
    [styles.disabled]: !complete,
  });

  return (
    <div className={completeClasses}>
      <Icon icon={complete ? CHECK_ICON : CHECK_DISABLED_ICON} readonly />
    </div>
  );
}

export default Complete;
