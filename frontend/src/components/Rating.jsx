import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const starNum = [1, 2, 3, 4, 5];

const Rating = ({ value, text }) => {
  const renderStar = (index) => {
    if (value >= index) {
      return <FaStar />;
    } else if (value >= index - 0.5) {
      return <FaStarHalfAlt />;
    } else {
      return <FaRegStar />;
    }
  };

  return (
    <div className="rating">
      {starNum.map((index) => (
        <span key={index}>{renderStar(index)}</span>
      ))}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;