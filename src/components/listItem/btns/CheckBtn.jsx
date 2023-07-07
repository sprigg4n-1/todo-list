import React from "react";

const CheckBtn = ({ toggleCheckedItem, elemId }) => {
  return (
    <button
      className="check-btn"
      onClick={() => toggleCheckedItem(elemId)}
    ></button>
  );
};

export default CheckBtn;
