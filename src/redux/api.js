import axios from "axios";

export const loadUsersApi = async () => {
  try {
    return await axios.get("http://141.164.40.222:5000/users");
  } catch (e) {
    throw new Error(e);
  }
};

export const createUsersApi = async (user) => {
  try {
    return await axios.post("http://141.164.40.222:5000/users", user);
  } catch (e) {
    throw new Error(e);
  }
};
