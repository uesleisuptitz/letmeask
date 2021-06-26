import React from "react";
import "../styles/button.scss";

const Button = ({ children, isOutlined = false, ...rest }) => {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
