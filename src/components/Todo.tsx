import React from "react";

const Todo: React.FC<{ text: string }> = ({ text }) => {
  const deleteHandler = () => {};

  return (
    <div className="card">
      <h2>{text}</h2>
      <div className="actions">
        <span>A Span</span>
        <button className="btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
