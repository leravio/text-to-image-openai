import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    await axios
      .post(`http://localhost:5000`, {
        prompt,
      })
      .then((response) => setData(response.data.image_url))
      .catch((error) => setError(error.message));

    setLoading(false);
  };

  return (
    <div className="App">
      <input className="c-checkbox" type="checkbox" id="checkbox" />
      <div className="c-formContainer">
        <form
          className={"c-form " + (data ? "result-img" : "")}
          onSubmit={generateImage}
        >
          <input
            className="c-form__input"
            type="text"
            placeholder="Text to image"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <label className="c-form__buttonLabel" htmlFor="checkbox">
            <button className="c-form__button" type="submit">
              Generate
            </button>
          </label>
          <label
            className="c-form__toggle"
            htmlFor="checkbox"
            data-title="Generate Image"
          ></label>
        </form>
      </div>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="c-formContainer">
          {error ? <h2>{error}</h2> : <img src={data} width="90%" />}
        </div>
      )}
    </div>
  );
}

export default App;
