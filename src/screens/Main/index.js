import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useApp } from "../../contexts/app";
import useMarkdown from "../../utils/useMarkdown";

function Main() {
  const { services, selectors } = useApp();
  const lesson = useMarkdown();

  return (
    <div>
      <button onClick={() => services.updateFinishedLessons(2)}>ADD</button>
      <ReactMarkdown children={lesson} />
    </div>
  );
}

export default Main;
