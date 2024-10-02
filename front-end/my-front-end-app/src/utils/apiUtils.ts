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

    console.log(decodedToken.userId);
  } else {
    return null;
  }
};

export const getProfilePic = (userId: number) => {};
