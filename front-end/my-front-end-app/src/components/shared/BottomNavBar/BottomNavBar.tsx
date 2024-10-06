import ProfileCircle from "./ProfileCircle";
import Option from "./Option";

import { IoIosMore, IoMdNotificationsOutline } from "react-icons/io";
import {
  IoChatboxEllipsesOutline,
  IoHomeOutline,
  IoPersonAddOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { getIdFromToken } from "../../../utils/apiUtils";

const BottomNavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const navigate = useNavigate();

  //const profilePic = getProfilePic()
  const profilePic = null;
  const homePlaceholder = () => navigate("/homepage");
  const friendRequestsPlaceholder = () => navigate("/friend-requests");
  const chatsPlaceholder = () => navigate("/chats"); // + / chat id
  const profilePlaceholder = (id: number) => navigate(`/profile/${id}`); // + / user id
  const notificationsPlaceholder = (id: number) => {
    // 3 LATEST NOTIFS
    // OR \/
    navigate(`/notifications/${id}`); // + / user id / notification id
  };
  const settingsPlaceholder = () => navigate("/settings");
  const morePlaceholder = () => setOpen((prev) => !prev);
  const ActivityLogsOnClick = () => console.log("al");
  const BlockedUsersOnClick = () => console.log("bu");
  const ReportsOnClick = () => console.log("r");

  useEffect(() => {
    const fetchData = async () => {
      const id = await getIdFromToken();
      setId(Number(id));
    };

    fetchData();
  });

  return (
    <div className="flex bg-slate-300 fixed bottom-0 h-16 w-full">
      <Option onClick={homePlaceholder} path="/homepage">
        <IoHomeOutline size={25} />
      </Option>
      <Option onClick={friendRequestsPlaceholder} path="/friend-requests">
        <IoPersonAddOutline size={25} />
      </Option>
      <Option onClick={chatsPlaceholder} path="/chats">
        <IoChatboxEllipsesOutline size={25} />
      </Option>
      <ProfileCircle src={profilePic} onClick={() => profilePlaceholder(id)} />
      <Option
        onClick={() => notificationsPlaceholder(id)}
        path="/notifications"
      >
        <IoMdNotificationsOutline size={25} />
      </Option>
      <Option onClick={settingsPlaceholder} path="/settings">
        <IoSettingsOutline size={25} />
      </Option>
      <Option onClick={morePlaceholder} path="/more">
        <IoIosMore size={25} />
      </Option>
      {open && (
        <Menu
          open={open}
          ActivityLogsOnClick={ActivityLogsOnClick}
          BlockedUsersOnClick={BlockedUsersOnClick}
          ReportsOnClick={ReportsOnClick}
        />
      )}
    </div>
  );
};

export default BottomNavBar;
