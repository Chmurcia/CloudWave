import { TextField } from "@mui/material";
import React from "react";

type SignUpProps = {
  handleSignUp: (e: React.FormEvent) => void;
  handleGoBack: () => void;
  height: number;
  minHeight: number;
  usernameValue: string;
  setUsernameValue: React.Dispatch<React.SetStateAction<string>>;
  emailValue: string;
  setEmailValue: React.Dispatch<React.SetStateAction<string>>;
  passwordValue: string;
  setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
  usernameErr: boolean;
  emailErr: boolean;
  setUsernameErr: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailErr: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUp = ({
  handleSignUp,
  handleGoBack,
  height,
  minHeight,
  usernameValue,
  setUsernameValue,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  usernameErr,
  emailErr,
  setUsernameErr,
  setEmailErr,
}: SignUpProps) => {
  const inputStyle = "bg-slate-300/80 w-[220px] rounded-md";

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value);
    setUsernameErr(false);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setEmailErr(false);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className="flex w-full h-full  justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-10 items-center "
      >
        <div className="flex flex-col gap-5 bg-slate-50/80 py-10 px-6 rounded-3xl">
          <div className={inputStyle}>
            <TextField
              error={usernameErr}
              id="outlined-basic"
              label="Username"
              value={usernameValue}
              onChange={handleUsernameChange}
              variant="outlined"
              type="text"
              helperText={usernameErr && "Username already in use"}
              className="absolute"
              required
            />
          </div>
          <div className={inputStyle}>
            <TextField
              error={emailErr}
              id="outlined-basic"
              label="Email"
              value={emailValue}
              onChange={handleEmailChange}
              variant="outlined"
              type="text"
              helperText={emailErr && "Email already in use"}
              className="absolute"
              required
            />
          </div>
          <div className={inputStyle}>
            <TextField
              id="outlined-basic"
              label="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
              variant="outlined"
              type="password"
              className="absolute"
              required
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            disabled={usernameErr || emailErr}
            type="submit"
            className={
              height > minHeight
                ? "bg-slate-200 py-1 px-20 text-xl rounded-2xl active:scale-110 transition-all"
                : "bg-slate-200 py-2 px-16 text-xl rounded-2xl active:scale-110 transition-all"
            }
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className={
              height > minHeight
                ? "bg-transparent border-slate-50 text-slate-50 border-2 py-1 px-20 text-xl rounded-2xl  active:scale-110 transition-all"
                : "bg-transparent border-slate-50 text-slate-50 border-2 py-2 px-16 text-xl rounded-2xl  active:scale-110 transition-all"
            }
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
