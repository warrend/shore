import { TRANSITION_CLASS, HTML_TAG, TRANSITION_DURATION } from '../constants';

function clickTransition(func: any) {
  const el = document.querySelector(HTML_TAG);
  el?.classList.add(TRANSITION_CLASS);

  setTimeout(() => {
    func();
  }, TRANSITION_DURATION);
}

export default clickTransition;
