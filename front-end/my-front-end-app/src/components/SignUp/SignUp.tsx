import { useState } from "react";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const [count, setCount] = useState<number>(0);
  return <SignUpForm count={count} setCount={setCount} />;
};

export default SignUp;
