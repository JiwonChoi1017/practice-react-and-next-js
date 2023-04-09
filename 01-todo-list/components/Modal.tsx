import React from "react";

const Modal: React.FC<{ onCancel: () => void; onConfirm: () => void }> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="modal">
      <p>Are you sure?</p>
      <button className="btn btn--alt" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default Modal;
