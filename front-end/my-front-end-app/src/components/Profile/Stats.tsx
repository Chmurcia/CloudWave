import { type ContentSeen } from "../../utils/typeUtils";

type StatsProps = {
  following: number;
  followers: number;
  setContent: React.Dispatch<React.SetStateAction<ContentSeen>>;
};

const Stats = ({ following, followers, setContent }: StatsProps) => {
  return (
    <div id="followers-following" className="flex justify-around mt-4 w-full">
      <div
        id="followers"
        className="flex gap-1"
        onClick={() => setContent("followers")}
      >
        <p className="text-slate-900 font-semibold">{followers}</p>
        <p>Followers</p>
      </div>
      <div id="following">
        <div
          id="following"
          className="flex gap-1"
          onClick={() => setContent("following")}
        >
          <p className="text-slate-900 font-semibold">{following}</p>
          <p>Following</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
