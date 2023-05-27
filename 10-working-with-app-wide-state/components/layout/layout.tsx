import MainHeader from "./main-header";
import Notification from "../ui/notification";
import { NotificationContext } from "@/store/notification-context";
import { useContext } from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && <Notification {...notification} />}
    </>
  );
};

export default Layout;
