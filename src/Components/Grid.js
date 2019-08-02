import React from "react";
import { useRef } from "react";
import useComponentSize from "@rehooks/component-size";

const GRIDS = {
  1: [1],
  2: [1, 1],
  3: [1, 1, 1],
  4: [2, 2],
  5: [3, 2],
  6: [3, 3],
  7: [3, 2, 2],
  8: [3, 2, 3],
  9: [3, 3, 3],
  10: [3, 4, 3],
  12: [4, 4, 4]
};

function Grid(props) {
  const { number, image } = props;
  // shape is a matrix of rows and columns
  const shape = GRIDS[number];

  // 4, 9, 16
  if (shape && shape.length && shape.length > 0) {
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
    return <h1>No Grid Config for {number}</h1>;
  }
}

export default Grid;

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
  return Array(parseInt(number, 10))
    .fill(0)
    .map((_, i) => {
      return i;
    });
}
