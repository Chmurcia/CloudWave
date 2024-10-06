import blank from "../../assets/blank.jpg";
import bg from "../../assets/bg.jpg";
import Options from "./Options";
import React, { useState } from "react";
import { ContentSeen } from "../../utils/typeUtils";
import Stats from "./Stats";
import FullName from "./FullName";
import Username from "./Username";
import Info from "./Info";
import Edit from "./Edit";

type ProfileHeaderProps = {
  profile: {
    username: string;
    firstName: string;
    lastName: string;
    followers: number;
    following: number;
    id: number;
  };
  isOwner: boolean;
  friendStatus: "friend" | "sent" | "notFriend";
  isFollowing: boolean;
  onFriendshipChange: (status: "friend" | "sent" | "notFriend") => void;
  onFollowToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<ContentSeen>>;
};

const ProfileHeader = ({
  profile,
  isOwner,
  friendStatus,
  isFollowing,
  onFriendshipChange,
  onFollowToggle,
  setContent,
}: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(false);
  return (
    <div id="top" className="bg-slate-300 h-min pb-2 shadow-md">
      <div id="bg-image" className="bg-slate-600 h-[14.09rem]">
        <img
          className="h-full w-full object-cover"
          src={bg}
          alt="background image"
        />
      </div>
      <div
        id="profile-image"
        className="h-40 aspect-square rounded-full absolute inset-0 mx-auto top-20"
      >
        <img
          className="flex h-full w-full justify-center items-center rounded-full"
          src={blank}
          alt="user image"
        />
      </div>
      <div id="info" className="flex flex-col items-center mt-10">
        {!isMore && (
          <>
            {!isEditing && (
              <>
                <Username username={profile.username} />
                <FullName
                  profile={{
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                  }}
                />
                <Stats
                  followers={profile.followers}
                  following={profile.following}
                  setContent={setContent}
                />
              </>
            )}
          </>
        )}
        {!isEditing && <>{isMore && <Info />}</>}
        {isEditing && <Edit />}
        <Options
          isOwner={isOwner}
          followOnClick={() => onFollowToggle(true)}
          removeFollowOnClick={() => onFollowToggle(false)}
          isFollowing={isFollowing}
          addFriendOnClick={() => onFriendshipChange("sent")}
          deleteFriendOnClick={() => onFriendshipChange("notFriend")}
          friend={friendStatus}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setIsMore={setIsMore}
          isMore={isMore}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
