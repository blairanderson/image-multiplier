import React from "react";

export default function Radio(props) {
  const name = props.options.join("-");
  return (
    <div>
      {props.options.map((el, i) => {
        const idValue = `${name}-${el}`;
        return (
          <div key={`${i}`} className="form-check">
            <label className="form-check-label" htmlFor={idValue}>
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={idValue}
                value={el}
                onChange={e => {
                  props.onChange(e.target.value);
                }}
                checked={el === props.checked}
              />
              {el}
            </label>
          </div>
        );
      })}
    </div>
  );
}
