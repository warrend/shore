import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import mdFile from "../../data/0.md";
import { useApp } from "../../contexts/app";

function Main() {
  const { services, selectors } = useApp();
  const [les, setLes] = useState("");

  useEffect(() => {
    const getLesson = async () => {
      const path = selectors.lessons[selectors.user.currentLesson].path;
      const file = await import(`../../data/${path}`);
      const res = await fetch(file.default);
      const markdownFile = await res.text();
      setLes(markdownFile);
    };

    getLesson();
  }, []);

  return (
    <div>
      <button onClick={() => services.updateFinishedLessons(2)}>ADD</button>
      <ReactMarkdown children={les} />
    </div>
  );
}

export default Main;
