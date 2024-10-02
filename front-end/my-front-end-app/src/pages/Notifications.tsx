import { useParams } from "react-router-dom";
import BottomNavBar from "../components/Homepage/BottomNavBar/BottomNavBar";

const Notifications = () => {
  const { notificationId } = useParams();
  return (
    <>
      <h1>Notifications {notificationId}</h1>
      <BottomNavBar />
    </>
  );
};
export default Notifications;
