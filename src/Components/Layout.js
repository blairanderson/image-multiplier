import React from "react";
import Radio from "./Radio";
import Grid from "./Grid";
import Stacked from "./Stacked";

function Layout(props) {
  const [stacked, setStacked] = React.useState("grid");
  return (
    <div>
      <Radio
        options={["grid", "stacked"]}
        checked={stacked}
        onChange={setStacked}
      />
      {stacked === "grid" ? <Grid {...props} /> : <Stacked {...props} />}
    </div>
  );
}

export default Layout;
