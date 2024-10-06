import { useParams } from "react-router-dom";

import BottomNavBar from "../components/shared/BottomNavBar/BottomNavBar";
import { useEffect, useState } from "react";
import {
  getFollowersById,
  getFollowingById,
  getIdFromToken,
  getUserById,
} from "../utils/apiUtils";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { type ContentSeen } from "../utils/typeUtils";

type Friend = "friend" | "sent" | "notFriend";

const Profile = () => {
  const { userId } = useParams();

  const [content, setContent] = useState<ContentSeen>("posts");
  const [friend, setFriend] = useState<Friend>("friend");
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [idFromToken, setIdFromToken] = useState<number>(0);

  const [profile, setProfile] = useState({
    username: "",
    firstName: "",
    lastName: "",
    id: 0,
    followers: 0,
    following: 0,
  });

  // const postsOnClick = () => {};

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await getUserById(Number(userId));
      const response2 = await getFollowersById(Number(userId));
      const response3 = await getFollowingById(Number(userId));
      setProfile({
        username: response1.username,
        firstName: response1.first_name,
        lastName: response1.last_name,
        id: response1.id,
        followers: response2.length,
        following: response3.length,
      });
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getIdFromToken();
      setIdFromToken(Number(id));
    };
    fetchData();
  });

  return (
    <>
      <div
        id="page"
        className="h-full w-full bg-slate-200 text-slate-950 font-thin"
      >
        <ProfileHeader
          profile={{
            username: profile.username,
            firstName: profile.firstName,
            lastName: profile.lastName,
            followers: profile.followers,
            following: profile.following,
            id: Number(profile.id),
          }}
          onFollowToggle={setIsFollowing}
          friendStatus={friend}
          onFriendshipChange={setFriend}
          isOwner={idFromToken === profile.id}
          isFollowing={isFollowing}
          setContent={setContent}
        />
      </div>
      <div id="bottom">{content}</div>
      <BottomNavBar />
    </>
  );
};
export default Profile;
