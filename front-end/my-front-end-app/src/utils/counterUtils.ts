import axios from "axios";

const countUsers = async (): Promise<number> => {
  try {
    const response = await axios.get("http://localhost:8081/api/users");
    console.log(response.data);
    const usersLength = response.data.data.resources.length;
    return usersLength;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const countPosts = async (): Promise<number> => {
  try {
    const response = await axios.get("http://localhost:8081/api/posts");
    console.log(response.data);
    const postsLength = response.data.data.resources.length;
    return postsLength;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const countChats = async (): Promise<number> => {
  try {
    const response = await axios.get("http://localhost:8081/api/chats");
    console.log(response.data);
    const chatsLength = response.data.data.resources.length;
    return chatsLength;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export { countUsers, countPosts, countChats };
