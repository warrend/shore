import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import { WELCOME_COPY, LESSONS_URL, TRACKS_URL } from "../../constants";
import { useApp } from "../../contexts/app";
import welcome1 from "../../data/welcome1.md";
import welcome2 from "../../data/welcome2.md";
import welcome3 from "../../data/welcome3.md";

function Welcome() {
  const pages = [welcome1, welcome2, welcome3];

  const pageLength = pages.length;

  const [page, setPage] = useState(1);
  const [text, setText] = useState("");

  const history = useHistory();
  const {
    services: { registerUser },
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
      return history.push(TRACKS_URL);
    }

    setPage(page + 1);
  };

  const goBack = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  return (
    <div>
      {page !== 1 && <button onClick={goBack}>Back</button>}
      <ReactMarkdown children={text} />
      <button onClick={handleNext}>
        {page === pageLength ? "Start" : "Next"}
      </button>
    </div>
  );
}

export default Welcome;
