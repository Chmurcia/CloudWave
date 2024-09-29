import MainTitleAnimation from "../components/MainTitle/MainTitleAnimation";
import MenuBtn from "../components/MenuBtn/MenuBtn";
import { motion } from "framer-motion";
// import PeopleE2EE from "../components/PeopleE2EE/PeopleE2EE";

const WelcomePage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center overflow-hidden py-4 gap-4 font-thin bg-[url('src/assets/city-bg.jpg')] bg-cover font-sans">
      <MenuBtn />
      <div className="flex flex-col items-center gap-4">
        <MainTitleAnimation className="text-5xl font-bold text-slate-50 mt-12 " />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-slate-100"
        >
          where connections thrive and creativity flows
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex gap-10 justify-center mt-10 font-extralight"
        >
          <button className="bg-slate-200 py-2 px-5 text-xl rounded-2xl active:scale-110 transition-all">
            Sign Up
          </button>
          <button className="bg-transparent border-slate-200 border-2 px-5 py-2 text-xl rounded-2xl text-slate-200 active:scale-110 transition-all">
            Sign In
          </button>
        </motion.div>
        {/* <div className="flex flex-col w-full py-2 items-center ">
        <p className="text-6xl font-extrabold text-blue-100">E2EE</p>
        <PeopleE2EE />
        <p className="text-blue-100 mt-3 mx-6 ">
        End-to-End Encryption (E2EE) is a secure communication method that
        ensures only the communicating users can read the messages. In E2EE,
        data is encrypted on the sender's device and only decrypted on the
        recipient's device, preventing unauthorized access!
        </p>
        </div> */}
      </div>
    </div>
    // COUNTER USERS, CHATS, MESSAGES
    // MORE ANIMATIONS (CREATING CHATS, FRIENDS ETC)
  );
};
export default WelcomePage;
