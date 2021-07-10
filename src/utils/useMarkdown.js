import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/app";

function useMarkdown(slug, path) {
  const [md, setMd] = useState("");

  useEffect(() => {
    const getLesson = async () => {
      const file = await import(`../data/tracks/${slug}/${path}`);
      const res = await fetch(file.default);
      const markdownFile = await res.text();
      setMd(markdownFile);
    };

    getLesson();
  }, []);

  return md;
}

export default useMarkdown;
