import React from 'react';
import { useHistory } from 'react-router-dom';
import { TRACKS_URL } from '../../constants';
import { TrackData } from '../../sharedTypes';

type TrackCardProps = {
  track: TrackData;
};

function TrackCard({ track }: TrackCardProps) {
  const { title, id, path } = track;
  const history = useHistory();

  const handleDetailCard = (lessonId: string | number) => {
    history.push(`${TRACKS_URL}/${lessonId}`);
  };

  return (
    <div
      onClick={() => handleDetailCard(path)}
      onKeyPress={() => handleDetailCard(path)}
      tabIndex={0}
      role="button"
    >
      <div>
        <span>{id}</span>
        {title}
      </div>
    </div>
  );
}

export default TrackCard;
