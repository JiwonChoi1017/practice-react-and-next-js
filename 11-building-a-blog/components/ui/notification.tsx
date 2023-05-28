import ReactDOM from "react-dom";
import classes from "./notification.module.css";

interface Props {
  title: string;
  message: string;
  status: string;
}

const Notification = ({ title, message, status }: Props) => {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;
  const notificationsDOM = document.getElementById("notifications");

  return !notificationsDOM ? (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  ) : (
    ReactDOM.createPortal(
      <div className={cssClasses}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>,
      notificationsDOM
    )
  );
};

export default Notification;
