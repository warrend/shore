import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function LessonCard({ lesson }) {
  const { title, id } = lesson;
  const history = useHistory();

  const handleDetailCard = (id) => {
    history.push(`/main/lesson/${id}`);
  };

  return <div onClick={() => handleDetailCard(id)}>Lesson {title}</div>;
}

LessonCard.propTypes = {
  lesson: PropTypes.object,
};

export default LessonCard;
