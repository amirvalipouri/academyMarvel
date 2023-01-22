import React from "react";

export default function Review({ desc = "" }) {
  return (
    <React.Fragment>
      <h5 className="my-5 text-primary">نقد و بررسی</h5>
      <p className="fs-5 text-justify lh-lg">{desc} </p>
    </React.Fragment>
  );
}
