import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { LESSONS_URL, COFFEE_ICON, LESSON } from "../../constants";
import styles from "./NextCard.module.scss";
import Icon from "../Icon";

function NextCard({ lesson }) {
  const { title, id } = lesson;
  const history = useHistory();

  const handleDetailCard = (id) => {
    history.push(`${LESSONS_URL}/${id}`);
  };

  return (
    <div className={styles.wrapper} onClick={() => handleDetailCard(id)}>
      <Icon icon={COFFEE_ICON} custom background />
      <span className={styles.lesson}>
        {LESSON} {id}
      </span>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

NextCard.propTypes = {
  lesson: PropTypes.object,
};

export default NextCard;
