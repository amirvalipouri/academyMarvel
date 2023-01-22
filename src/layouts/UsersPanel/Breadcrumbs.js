import React from "react";
import { useLocation } from "react-router";
import { navItems } from "../../constants";

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = navItems.user.map((e) => [e.path.replace("/", ""), e.label]);
  const pathsObj = {
    ...Object.fromEntries(paths),
    cart: "سبد خرید",
  };
  const direction = location.pathname
    .split("/")
    .map((path) => pathsObj[path])
    .filter((e) => e);
  return (
    <div className="Breadcrumbs d-flex flex-column lh-lg">
      <h6>{direction.at(-1)}</h6>
      <p className="fs-7">
        {direction.map((item, index) => (
          <React.Fragment key={index}>
            {index !== 0 && " / "}
            <span>{item}</span>
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
