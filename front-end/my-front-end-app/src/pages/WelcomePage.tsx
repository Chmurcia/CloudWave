import TextAnimIn from "../components/WelcomePage/TextAnimIn/TextAnimIn";
import LogoAnimIn from "../components/WelcomePage/Logo/LogoAnimIn";
import Counters from "../components/WelcomePage/Counters/Counters";
import SignButtons from "../components/WelcomePage/SignButtons";

import { motion } from "framer-motion";
import SignUp from "../components/WelcomePage/SignUp/SignUp";
import { useState } from "react";
import SignIn from "../components/WelcomePage/SignIn/SignIn";
import {
  checkEmail,
  checkUsername,
  createUser,
  getIdFromToken,
  loginUser,
} from "../utils/apiUtils";

const WelcomePage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUsernameErr, setIsUsernameErr] = useState<boolean>(false);
  const [isEmailErr, setIsEmailErr] = useState<boolean>(false);
  const [isSignInErr, setIsSignInErr] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const height = window.innerHeight;
  const minHeight = 850;

  const handlePageSignUp = () => {
    setPage(3);
  };
  const handlePageSignIn = () => {
    setPage(2);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const resUsername = await checkUsername(username);
    if (resUsername !== 404) return setIsUsernameErr(true);
    else setIsUsernameErr(false);
    const resEmail = await checkEmail(email);
    if (resEmail !== 404) return setIsEmailErr(true);
    else setIsEmailErr(false);

    await createUser(username, email, password);
    setPage(1);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res?.status === 401) return setIsSignInErr(true);
    localStorage.setItem("token", res.token);
    console.log(localStorage.getItem("token"));
    setEmail("");
    setPassword("");
    // NAVIGATE TO APPLICATION
    getIdFromToken();
  };
  const handleGoBack = () => {
    setPage(1);
  };

  return (
    <div className="bg-[url('src/assets/city-bg.jpg')] w-full h-full bg-cover font-sans overflow-hidden">
      <motion.div
        initial={{ display: "block", x: 0 }}
        animate={
          page === 1 ? { display: "block", x: 0 } : { display: "none", x: -500 }
        }
        transition={
          page === 1
            ? { delay: 0.3, duration: 0.2 }
            : { delay: 0.2, duration: 0.2 }
        }
        // transition={{ delay: 1, duration: 3 }}
        className="flex flex-col w-full h-full items-center py-4 gap-4 font-thin"
      >
        <div className="flex flex-col items-center gap-4">
          <TextAnimIn
            string="C.l.o.u.d.W.a.v.e"
            delay={10}
            className={
              height > minHeight
                ? "text-5xl font-bold text-slate-50 mt-12 mb-5 "
                : "text-4xl font-bold text-slate-50 mt-2"
            }
          />
          <LogoAnimIn size="lg" />
          <TextAnimIn
            string="c.o.n.n.e.c.t.i.o.n.s-t.h.r.i.v.e"
            delay={20}
            className={
              height > minHeight
                ? "text-slate-100 text-xl font-medium italic tracking-widest"
                : "text-slate-100 text-lg font-medium italic tracking-widest"
            }
          />
        </div>
        <Counters height={height} minHeight={minHeight} />
        <SignButtons
          height={height}
          minHeight={minHeight}
          handlePageSignUp={handlePageSignUp}
          handlePageSignIn={handlePageSignIn}
        />
      </motion.div>
      <motion.div
        initial={{ display: "none", x: 500 }}
        animate={
          page === 3 ? { display: "block", x: 0 } : { display: "none", x: 500 }
        }
        transition={
          page === 3
            ? { delay: 0.3, duration: 0.2 }
            : { delay: 0.2, duration: 0.2 }
        }
        className="h-full w-full"
      >
        <SignUp
          usernameErr={isUsernameErr}
          emailErr={isEmailErr}
          handleGoBack={handleGoBack}
          height={height}
          minHeight={minHeight}
          handleSignUp={handleSignUp}
          usernameValue={username}
          setUsernameValue={setUsername}
          emailValue={email}
          setEmailValue={setEmail}
          passwordValue={password}
          setPasswordValue={setPassword}
          setUsernameErr={setIsUsernameErr}
          setEmailErr={setIsEmailErr}
        />
      </motion.div>
      <motion.div
        initial={{ display: "none", x: 500 }}
        animate={
          page === 2 ? { display: "block", x: 0 } : { display: "none", x: 500 }
        }
        transition={
          page === 2
            ? { delay: 0.3, duration: 0.2 }
            : { delay: 0.2, duration: 0.2 }
        }
        className="h-full w-full"
      >
        <SignIn
          isErr={isSignInErr}
          handleGoBack={handleGoBack}
          height={height}
          minHeight={minHeight}
          handleSignIn={handleSignIn}
          emailValue={email}
          setEmailValue={setEmail}
          passwordValue={password}
          setPasswordValue={setPassword}
          setIsSignInErr={setIsSignInErr}
        />
      </motion.div>
    </div>
  );
};
export default WelcomePage;
