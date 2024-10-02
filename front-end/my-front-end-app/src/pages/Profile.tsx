import { useParams } from "react-router-dom";
import BottomNavBar from "../components/Homepage/BottomNavBar/BottomNavBar";

const Profile = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>Profile {userId}</h1>
      <BottomNavBar />
    </>
  );
};
export default Profile;
