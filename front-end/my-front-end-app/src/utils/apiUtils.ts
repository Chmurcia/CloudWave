import axios from "axios";

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
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
