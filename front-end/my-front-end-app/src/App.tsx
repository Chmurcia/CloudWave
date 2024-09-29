import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SignUp from "./components/SignUp/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default App;
