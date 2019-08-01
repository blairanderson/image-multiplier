import React from "react";
import ReactDOM from "react-dom";
import { useRef } from "react";
import useComponentSize from "@rehooks/component-size";

import "./styles.css";

const GRIDS = {
  1: [1],
  2: [1, 1],
  3: HVToggle,
  4: [2, 2],
  5: [3, 2],
  6: [3, 3],
  7: [3, 2, 2],
  8: [3, 2, 3],
  9: [3, 3, 3],
  10: [3, 4, 3],
  12: [4, 4, 4]
};

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
        <Grid {...props} setDims={setDims} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

function HVToggle(props) {
  return props.horizontal ? <Horizontal {...props} /> : <Vertical {...props} />;
}

function Horizontal(props) {
  const { number, image } = props;
  return (
    <div className="row no-gutters">
      {nTimes(number).map((arg, index) => {
        return (
          <div key={index} className="col">
            <img className="img-fluid" src={image} alt={image} />
          </div>
        );
      })}
    </div>
  );
}

function Vertical(props) {
  const { number, image } = props;
  return nTimes(number).map((arg, index) => {
    return (
      <div key={index} className="row no-gutters">
        <div className="col">
          <img className="img-fluid" alt={image} src={image} />
        </div>
      </div>
    );
  });
}

function Grid(props) {
  const { number, image } = props;
  // shape is a matrix of rows and columns
  const shape = GRIDS[number];

  // 4, 9, 16
  if (shape && shape.length && shape.length > 1) {
    return (
      <React.Fragment>
        {shape.map((row, rowIndex) => {
          return (
            <div
              key={`row-${rowIndex}`}
              className="row  justify-content-center no-gutters"
            >
              {nTimes(row).map((col, colIndex) => {
                const key = `row-${rowIndex}-col-${colIndex}`;

                return (
                  <ColImage
                    key={key}
                    dimKey={key}
                    maxWidth={props.maxWidth}
                    dims={props.dims}
                    setDims={props.setDims}
                    image={image}
                  />
                );
              })}
            </div>
          );
        })}
      </React.Fragment>
    );
  } else {
    return <h1>No Grid for {number}</h1>;
  }
}

function ColImage(props) {
  const { setDims, dimKey, maxWidth } = props;
  let ref = useRef(null);
  let size = useComponentSize(ref);

  // size == { width: 100, height: 200 }
  let { width, height } = size;

  //props.setDims(newDims)
  React.useEffect(() => {
    // Update the document title using the browser API
    setDims(dimKey, width, height);
  }, [width, height, dimKey, setDims]);

  // React.useEffect(setDimms, [width, height, dimKey, setDims])
  const notYetSet = !props.dims[dimKey] && width > 0 && height > 0;
  const changed = false; // width > 0 && maxWidth > 0 && width > maxWidth // width > 0 && maxWidth > width
  if (notYetSet || changed) {
    //   setDimms();
  }

  let style = {};

  if (maxWidth > 0) {
    style.width = `${maxWidth}px`;
  }

  return (
    <div className="col">
      <img
        ref={ref}
        className={`img-fluid ${width}`}
        style={style}
        src={props.image}
        alt={props.image}
      />
    </div>
  );
}

function nTimes(number) {
  return Array.from(Array(parseInt(number, 10)));
}
