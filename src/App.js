import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [markdownValue, setMarkdownValue] = useState("## markdown preview");
  return (
    <main>
      <section className="markdown">
        <textarea
          className="input"
          value={markdownValue}
          onChange={(e) => setMarkdownValue(e.target.value)}
        ></textarea>
        <article className="result">
          <ReactMarkdown>{markdownValue}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
};

export default App;
