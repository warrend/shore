import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { LESSONS_URL } from "../../constants";
import styles from "./LessonCard.module.scss";
function LessonCard({ lesson }) {
  console.log("lesson", lesson);
  const { title, id, isCompleted } = lesson;
  const history = useHistory();

  const handleDetailCard = (id) => {
    history.push(`${LESSONS_URL}/${id}`);
  };

  return (
    <div onClick={() => handleDetailCard(id)}>
      <div>
        {id} {title}
      </div>
      <div>{isCompleted && "complete"}</div>
    </div>
  );
}

LessonCard.propTypes = {
  lesson: PropTypes.object,
};

export default LessonCard;
