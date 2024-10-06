import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const fetchUsername = async (username: string) => {
  try {
    await axios.post("http://localhost:8081/api/users/get-username", {
      username,
    });
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        if (err.response.status === 404) {
          return false;
        } else {
          console.log(`Error ${err.response.status}: ${err.response.data}`);
        }
      } else if (err.request) {
        console.log(`No response received: ${err.request}`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    } else {
      console.log("An unknown error occured");
    }
  }
};

export const fetchEmail = async (email: string) => {
  try {
    await axios.post("http://localhost:8081/api/users/get-email", {
      email,
    });
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        if (err.response.status === 404) {
          return false;
        } else {
          console.log(`Error ${err.response.status}: ${err.response.data}`);
        }
      } else if (err.request) {
        console.log(`No response received: ${err.request}`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    } else {
      console.log("An unknown error occured");
    }
  }
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/auth/register",
      { username, email, password }
    );
    return response.data;
  } catch (err) {
    if (err) return 404;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:8081/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.data;
    } else {
      console.log(err);
    }
  }
};

export const checkUsername = async (username: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/users/get-username",
      { username }
    );
    console.log(response.data);
  } catch (err) {
    if (err) return 404;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/users/get-email",
      { email }
    );
    console.log(response);
    return response;
  } catch (err) {
    if (err) return 404;
  }
};

export const getIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);

    return decodedToken.userId;
  } else {
    return null;
  }
};

// GETTING USER DATA

export const getUserById = async (userId: number) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8081/api/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { userId },
    });
    return response.data.data.resources;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFollowersById = async (followingId: number) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:8081/api/followers/get-followers-by-id",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { followingId },
      }
    );
    return response.data.data.resources;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFollowingById = async (followerId: number) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:8081/api/followers/get-following-by-id",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { followerId },
      }
    );
    return response.data.data.resources;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getChats = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/chats");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getChatById = async (chatId: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8081/api/chats/get-chat-by-id",
      {
        chatId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getChatSettingsById = async (chatId: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8081/api/chats/settings",
      {
        chatId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getChatUserSettings = async (userId: number, chatId: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8081/api/chats/user-settings/get-by-ids",
      {
        userId,
        chatId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createMessage = async (
  senderId: number,
  chatId: number,
  content: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8081/api/messages",
      {
        senderId,
        chatId,
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMessagesById = async (chatId: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8081/api/messages/get-by-chat-id",
      {
        chatId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// http://localhost:8081/api/users/user
// http://localhost:8081/api/chats/

//http://localhost:8081/api/chats/user-settings/get-by-ids

// http://localhost:8081/api/messages/get-by-chat-id
