import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { TRACKS_URL } from "../../constants";

function TrackCard({ track }) {
  const { title, id, path } = track;
  const history = useHistory();

  const handleDetailCard = (id) => {
    history.push(`${TRACKS_URL}/${id}`);
  };

  return (
    <div onClick={() => handleDetailCard(path)}>
      <div>
        <span>{id}</span> {title}
      </div>
    </div>
  );
}

TrackCard.propTypes = {
  lesson: PropTypes.object,
};

export default TrackCard;
