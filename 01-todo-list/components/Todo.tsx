import React, { useState } from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

const Todo: React.FC<{ text: string }> = ({ text }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const clickDeleteButtonHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const deleteTodoHandler = () => {};

  return (
    <div className="card">
      <h2>{text}</h2>
      <div className="actions">
        <span>A Span</span>
        <button className="btn" onClick={clickDeleteButtonHandler}>
          Delete
        </button>
      </div>
      {showModal && (
        <>
          <Modal onCancel={closeModalHandler} onConfirm={deleteTodoHandler} />
          <Backdrop onCancel={closeModalHandler} />
        </>
      )}
    </div>
  );
};

export default Todo;
