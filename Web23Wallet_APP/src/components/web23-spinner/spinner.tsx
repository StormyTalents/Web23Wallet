import React from "react";

import "./spinner.css";

const Web23Spinner: React.FC = () => {
  return (
    <div className="loading">
      <div className="arc"></div>
      <div className="arc"></div>
      <div className="arc"></div>
    </div>
  );
};

export default Web23Spinner;
