const Backdrop: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  return <div className="backdrop" onClick={onCancel} />;
};

export default Backdrop;
