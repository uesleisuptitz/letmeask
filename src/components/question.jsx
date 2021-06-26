import React from "react";
import "../styles/question.scss";

const Question = ({
  children,
  content = "",
  author: { name = "", avatar = "" },
  isHighlighted = false,
  isAnswered = false,
}) => {
  return (
    <div
      className={`question ${
        isAnswered ? "answered" : isHighlighted ? "highlighted" : ""
      }`}
    >
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
