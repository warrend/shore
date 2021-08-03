import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import Button from '../../components/interactions/Button';
import { COFFEE_ICON, ROOT_URL } from '../../constants';
import { useApp } from '../../contexts/app';
import welcome1 from '../../data/welcome1.md';
import welcome2 from '../../data/welcome2.md';
import welcome3 from '../../data/welcome3.md';
import styles from './Welcome.module.scss';
import Icon from '../../components/Icon';

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

  const buttonBarStyles = cn({
    [styles.button_bar]: true,
    [styles.single]: page === 1,
  });

  return (
    <div>
      <Icon icon={COFFEE_ICON} background />
      <div className={styles.content}>
        <div className={buttonBarStyles}>
          {page !== 1 && <Button secondary onClick={goBack} name="Back" />}
          <Button
            secondary={page !== pageLength}
            onClick={handleNext}
            name={page === pageLength ? 'Start' : 'Next'}
          />
        </div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Welcome;
