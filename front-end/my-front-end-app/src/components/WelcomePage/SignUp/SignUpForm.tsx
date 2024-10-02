import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { createUser, fetchEmail, fetchUsername } from "../../utils/apiUtils";

const SignUpForm = ({
  count,
  setCount,
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUsernameExist, setIsUsernameExist] = useState<boolean | undefined>(
    undefined
  );
  const [isEmailExist, setIsEmailExist] = useState<boolean | undefined>(
    undefined
  );
  const [isPasswordOk, setIsPasswordOk] = useState<boolean | null>(null);

  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);

  const increaseCounter = () => setCount((prev) => prev + 1);

  const handleCheck = async () => {
    if (count === 0) {
      const exists = await fetchUsername(username);
      if (exists) {
        setIsUsernameExist(true);
        return;
      }
      setIsUsernameExist(false);
      increaseCounter();
    } else if (count === 1) {
      const exists = await fetchEmail(email);
      if (exists) {
        setIsEmailExist(true);
        return;
      }
      setIsEmailExist(false);
      increaseCounter();
    } else {
      if (password.length < 5) {
        setIsPasswordOk(false);
      } else {
        setIsPasswordOk(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser(username, email, password);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    if (username === "") setIsUsernameExist(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (email === "") setIsEmailExist(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (password.length < 5) setIsPasswordOk(false);
  };

  return (
    <form
      action=""
      method="POST"
      onSubmit={handleSubmit}
      className="flex w-full h-full justify-center items-center flex-col gap-4 overflow-hidden"
    >
      <div className="flex justify-center w-full mb-5">
        <motion.p
          className="text-2xl absolute"
          initial={{ opacity: 0, x: -100, y: -20 }}
          animate={
            isAnimatingOut ? { opacity: 0, x: 1000 } : { opacity: 1, x: 0 }
          }
          transition={{ delay: 0 }}
          onAnimationComplete={() => {
            if (!isAnimatingOut) {
              setTimeout(() => {
                setIsAnimatingOut(true);
              }, 500);
            }
          }}
        >
          Very well!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -50, y: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="text-2xl absolute"
        >
          What's your{" "}
          {count === 0 ? "username" : count === 1 ? "email" : "password"}?
        </motion.p>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <TextField
            error={
              count === 0
                ? isUsernameExist
                : count === 1
                ? isEmailExist
                : undefined
            }
            id="outlined-basic"
            label={
              count === 0 ? "Username" : count === 1 ? "Email" : "Password"
            }
            variant="outlined"
            value={count === 0 ? username : count === 1 ? email : password}
            type={count === 2 ? "password" : ""}
            onChange={
              count === 0
                ? handleNameChange
                : count === 1
                ? handleEmailChange
                : handlePasswordChange
            }
            helperText={
              isUsernameExist
                ? "Username already exists"
                : isEmailExist
                ? "Email already exists"
                : isPasswordOk
                ? "Password must be longer!"
                : ""
            }
            className="absolute"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -50, y: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
        className="flex gap-10"
      >
        <Button variant="outlined" className="mt-10" size="large">
          Cancel
        </Button>
        <Button
          disabled={
            (count === 0 && username === "") ||
            (count === 1 && email === "") ||
            (count === 2 && password === "")
          }
          variant="contained"
          onClick={handleCheck}
          className="mt-10"
          size="large"
          type={count >= 2 ? "submit" : "button"}
        >
          {count >= 2 ? "Done" : "Next"}
        </Button>
      </motion.div>
    </form>
  );
};

export default SignUpForm;
