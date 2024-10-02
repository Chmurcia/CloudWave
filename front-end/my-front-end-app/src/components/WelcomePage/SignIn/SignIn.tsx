import { TextField } from "@mui/material";
import React from "react";

type SignInProps = {
  handleSignIn: (e: React.FormEvent) => void;
  handleGoBack: () => void;
  height: number;
  minHeight: number;
  emailValue: string;
  setEmailValue: React.Dispatch<React.SetStateAction<string>>;
  passwordValue: string;
  setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
  isErr: boolean;
  setIsSignInErr: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignIn = ({
  handleSignIn,
  handleGoBack,
  height,
  minHeight,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  isErr,
  setIsSignInErr,
}: SignInProps) => {
  const inputStyle = "bg-slate-300/80 w-[220px] rounded-md";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setIsSignInErr(false);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    setIsSignInErr(false);
  };

  return (
    <div className="flex w-full h-full  justify-center items-center ">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-10 items-center "
      >
        <div className="flex flex-col gap-5 bg-slate-50/80 py-10 px-6 rounded-3xl">
          <div className={inputStyle}>
            <TextField
              error={isErr}
              id="outlined-basic"
              label="Email"
              value={emailValue}
              onChange={handleEmailChange}
              variant="outlined"
              type="text"
              helperText={isErr && "Email or password is incorrect!"}
              className="absolute"
              required
            />
          </div>
          <div className={inputStyle}>
            <TextField
              error={isErr}
              id="outlined-basic"
              label="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
              variant="outlined"
              type="password"
              helperText={isErr && "Email or password is incorrect!"}
              className="absolute"
              required
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            disabled={isErr}
            type="submit"
            className={
              height > minHeight
                ? "bg-slate-200 py-1 px-20 text-xl rounded-2xl active:scale-110 transition-all"
                : "bg-slate-200 py-2 px-16 text-xl rounded-2xl active:scale-110 transition-all"
            }
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className={
              height > minHeight
                ? "bg-transparent border-slate-50 border-2 py-1 px-20 text-xl rounded-2xl text-slate-50 active:scale-110 transition-all"
                : "bg-transparent border-slate-50 border-2 py-2 px-16 text-xl rounded-2xl text-slate-50 active:scale-110 transition-all"
            }
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
