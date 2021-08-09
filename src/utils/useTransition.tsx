import React, { useEffect } from 'react';
import { TRANSITION_CLASS, HTML_TAG } from '../constants';

function useTransition(loading?: boolean) {
  useEffect(() => {
    if (!loading) {
      const el = document.querySelector(HTML_TAG);
      el?.classList.remove(TRANSITION_CLASS);
    }
  }, []);

  return <></>;
}

export default useTransition;
