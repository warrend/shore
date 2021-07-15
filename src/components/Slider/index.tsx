import React from 'react';
import cn from 'classnames';
import { useApp } from '../../contexts/app';
import styles from './Slider.module.scss';
import Button from '../interactions/Button';

type SliderProps = {
  children?: React.ReactNode;
};

function Slider({ children }: SliderProps) {
  const {
    selectors: { sliderState },
    services: { changeSliderState },
  } = useApp();

  const btnClass = cn({
    [styles.wrapper]: true,
    [styles.closed]: !sliderState,
  });

  return (
    <div className={btnClass}>
      <Button onClick={() => changeSliderState(false)} name="close" />
      {children}
    </div>
  );
}

export default Slider;
