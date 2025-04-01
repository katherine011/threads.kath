import React from "react";

type Component = () => JSX.Element;

const withframe = (Component: Component) => {
  return (
    <div className="h-100vh w-[700px] border  ">
      <Component />
    </div>
  );
};

export default withframe;
