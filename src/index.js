import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Components/Layout";

import "./styles.css";

function App() {
  const [number, setNum] = React.useState(6);
  const [image, setImage] = React.useState(
    "https://images-na.ssl-images-amazon.com/images/I/41nrZ5xHxKL._SL1050_.jpg"
  );
  const [dims, setDimensions] = React.useState({});
  const [maxWidth, setWidth] = React.useState(0);

  const setDims = function(key, width, height) {
    const newState = { ...dims };
    newState[key] = `w=${width}.h=${height}`;
    setDimensions(newState);
    if (maxWidth === 0 || width < maxWidth) {
      setWidth(width);
    }
  };

  function setNumber(num) {
    setNum(num);
    setWidth(0);
    setDimensions({});
  }

  const props = {
    dims,
    setDims,
    maxWidth,
    number,
    image
  };

  return (
    <div className="App">
      <h1>Image Multiplier</h1>

      <div className="container">
        <p style={{ maxWidth: "500px" }} className="lead mx-auto">
          "Multiply" product image with a URL.
        </p>
        <input
          type="number"
          value={number}
          className="form-control"
          min={1}
          onChange={e => {
            setNumber(parseInt(e.target.value, 10) || 1);
          }}
        />
        <input
          type="string"
          className="form-control"
          value={image}
          onChange={e => {
            setImage(e.target.value);
          }}
        />{" "}
      </div>
      <div>{maxWidth}</div>
      <div className="container-fluid" id="capture full size screenshot">
        <Layout {...props} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
