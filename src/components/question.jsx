import React from "react";
import "../styles/question.scss";

const Question = ({
  children,
  content = "",
  author: { name = "", avatar = "" },
}) => {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default Question;
