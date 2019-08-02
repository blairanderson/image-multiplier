import React from "react";

const GRIDS = {
  1: [1],
  2: [1, 1],
  3: [3],
  4: [2, 2],
  5: [5],
  6: [3, 3],
  7: [7],
  8: [4, 4],
  9: [3, 3, 3],
  10: [5, 5],
  12: [4, 4, 4]
};

function Stacked(props) {
  const { number, image } = props;
  const [offsetX, setOffsetX] = React.useState(100);
  const [offsetY, setOffsetY] = React.useState(100);
  // shape is a matrix of rows and columns
  const shape = GRIDS[number];

  // 4, 9, 16
  if (shape && shape.length && shape.length > 0) {
    return (
      <div>
        <div className="row">
        <input
          type="range"
          className="form-control col-6"
          value={offsetX}
          onChange={e => {
            setOffsetX(parseInt(e.target.value, 10));
          }}
          min={5}
          max={200}
        />
                <input
          type="range"
          className="form-control col-6"
          value={offsetY}
          onChange={e => {
            setOffsetY(parseInt(e.target.value, 10));
          }}
          min={5}
          max={200}
        />
        </div>
        
        <div className="row justify-content-center no-gutters">
          {shape.map((stack, stackIndex) => {
            return (
              <div key={`col-${stackIndex}`} className="col">
                {nTimes(stack).map((col, colIndex) => {
                  const key = `row-${stackIndex}-col-${colIndex}`;
                  const styles = {
                    position: "absolute",
                    right: `${200 + colIndex * offsetX}px`,
                    top: `${colIndex * offsetY}px`,
                    maxWidth: "50%"
                  };
                  return (
                    <img
                      key={key}
                      className={`img-fluid`}
                      style={styles}
                      src={image}
                      alt={image}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h1>No Stack Config for {number}</h1>;
  }
}

export default Stacked;

function nTimes(number) {
  return Array(parseInt(number, 10))
    .fill(0)
    .map((_, i) => {
      return i;
    });
}
