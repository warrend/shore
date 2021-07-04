import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { LESSONS_URL, BACK_BUTTON } from "../../constants";

function NoLesson() {
  const history = useHistory();

  const goBack = (id) => {
    history.push(LESSONS_URL);
  };

  return (
    <div>
      This lesson doesn't exist
      <button onClick={goBack}>{BACK_BUTTON}</button>
    </div>
  );
}

NoLesson.propTypes = {};

export default NoLesson;
