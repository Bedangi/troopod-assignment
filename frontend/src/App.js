import React, { useState } from "react";
import { generatePage } from "./api";
import "./App.css";

function App() {
  const [adText, setAdText] = useState("");
  const [url, setUrl] = useState("");
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await generatePage(adText, url);
    setOriginal(data.originalHTML);
    setModified(data.modifiedHTML);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Landing Page Personalizer</h1>

      <textarea
        placeholder="Enter Ad Creative"
        value={adText}
        onChange={(e) => setAdText(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Landing Page URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="output">
        <div>
          <h2>Original</h2>
          <div dangerouslySetInnerHTML={{ __html: original }} />
        </div>

        <div>
          <h2>Modified</h2>
          <div dangerouslySetInnerHTML={{ __html: modified }} />
        </div>
      </div>
    </div>
  );
}

export default App;