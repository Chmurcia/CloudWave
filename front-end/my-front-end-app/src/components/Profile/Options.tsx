import {
  IoArrowBackSharp,
  IoArrowForwardSharp,
  IoEyeOffOutline,
  IoEyeOutline,
  IoPersonAddOutline,
  IoPersonOutline,
  IoPersonRemoveOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import ProfileBtn from "./ProfileBtn";

type OptionsProps = {
  friend: string;
  isOwner: boolean;
  isFollowing: boolean;
  followOnClick: () => void;
  removeFollowOnClick: () => void;
  addFriendOnClick: () => void;
  deleteFriendOnClick: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsMore: React.Dispatch<React.SetStateAction<boolean>>;
  isMore: boolean;
};

const Options = ({
  isOwner,
  isFollowing,
  followOnClick,
  removeFollowOnClick,
  addFriendOnClick,
  friend,
  deleteFriendOnClick,
  setIsEditing,
  isEditing,
  setIsMore,
  isMore,
}: OptionsProps) => {
  return (
    <div
      id="options"
      className={
        isOwner
          ? "flex flex-wrap justify-around mt-4 w-2/3"
          : "flex flex-wrap justify-around my-8 w-full"
      }
    >
      {/* FOLLOW */}

      {!isOwner && (
        <ProfileBtn
          onClick={isFollowing ? removeFollowOnClick : followOnClick}
          text={isFollowing ? "Unfollow" : "Follow"}
        >
          {isFollowing ? (
            <IoEyeOffOutline size={25} />
          ) : (
            <IoEyeOutline size={25} />
          )}
        </ProfileBtn>
      )}
      {/* MORE */}
      {!isEditing && (
        <ProfileBtn
          onClick={() => setIsMore((prev) => !prev)}
          text={isMore ? "Hide Info" : "Show Info"}
        >
          {isMore ? (
            <IoArrowBackSharp size={25} />
          ) : (
            <IoArrowForwardSharp size={25} />
          )}
        </ProfileBtn>
      )}
      {/* FRIEND */}
      {!isOwner && (
        <ProfileBtn
          disabled={friend === "sent"}
          onClick={
            friend === "sent"
              ? deleteFriendOnClick
              : friend === "friend"
              ? deleteFriendOnClick
              : addFriendOnClick
          }
          text={
            friend === "sent"
              ? "Pending"
              : friend === "friend"
              ? "Delete friend"
              : "Add friend"
          }
        >
          {friend === "sent" ? (
            <IoPersonOutline size={25} />
          ) : friend === "friend" ? (
            <IoPersonRemoveOutline size={25} />
          ) : (
            <IoPersonAddOutline size={25} />
          )}
        </ProfileBtn>
      )}

      {isOwner && (
        <ProfileBtn
          onClick={() => setIsEditing((prev) => !prev)}
          text={isEditing ? "Stop editing" : "Edit"}
        >
          <IoSettingsOutline size={25} />
        </ProfileBtn>
      )}
    </div>
  );
};

export default Options;
