import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import Button from '../../components/interactions/Button';
import { ROOT_URL } from '../../constants';
import { useApp } from '../../contexts/app';
import welcome1 from '../../data/welcome1.md';
import welcome2 from '../../data/welcome2.md';
import welcome3 from '../../data/welcome3.md';

function Welcome() {
  const pages = [welcome1, welcome2, welcome3];

  const pageLength = pages.length;

  const [page, setPage] = useState(1);
  const [text, setText] = useState('');

  const history = useHistory();
  const {
    services: { registerUser, startApp },
  } = useApp();

  useEffect(() => {
    const getPage = async () => {
      const res = await fetch(pages[page - 1]);
      const markdownFile = await res.text();
      setText(markdownFile);
    };

    getPage();
  }, [page]);

  const handleNext = () => {
    if (page === pageLength) {
      registerUser();
      startApp();
      return history.push(ROOT_URL);
    }

    setPage(page + 1);

    return () => {};
  };

  const goBack = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  return (
    <div>
      {page !== 1 && (
        <button type="button" onClick={goBack}>
          Back
        </button>
      )}
      {/* <ReactMarkdown children={text} /> */}
      <ReactMarkdown>{text}</ReactMarkdown>
      <Button
        secondary
        onClick={handleNext}
        name={page === pageLength ? 'Start' : 'Next'}
      />
    </div>
  );
}

export default Welcome;
