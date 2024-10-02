import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Homepage from "./pages/Homepage";
import Chats from "./pages/Chats";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import PageNotFound from "./pages/PageNotFound";
import FriendRequests from "./pages/FriendRequests";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/friend-requests" element={<FriendRequests />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/chats/:chatId" element={<Chat />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route
        path="/notifications/:notificationId"
        element={<Notifications />}
      />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
