import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    /* From Uiverse.io by G4b413l */
    <div className="flex justify-center items-center h-screen">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
