import { createContext, useEffect, useState } from "react";

interface NotificationContextType {
  notification: NotificationData | undefined;
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

interface Props {
  children?: React.ReactNode;
}

interface NotificationData {
  title: string;
  message: string;
  status: string;
}

export const NotificationContextProvider = (props: Props) => {
  const [activeNotification, setActiveNotification] = useState<
    NotificationData | undefined
  >(undefined);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(undefined);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: NotificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(undefined);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};
