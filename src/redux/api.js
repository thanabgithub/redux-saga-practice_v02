import axios from "axios";

export const loadUsersApi = async () => {
  try {
    return await axios.get("http://141.164.40.222:5000/users");
  } catch (e) {
    throw new Error(e);
  }
};

export const createUserApi = async (user) => {
  try {
    return await axios.post("http://141.164.40.222:5000/users", user);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const deleteUrl = `http://141.164.40.222:5000/users/${userId}`;
    return await axios.delete(deleteUrl);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserApi = async (userId, userInfo) => {
  try {
    const updateUrl = `http://141.164.40.222:5000/users/${userId}`;
    return await axios.put(updateUrl, userInfo);
  } catch (e) {
    throw new Error(e);
  }
};

export const searchUserApi = async (query) => {
  try {
    const searchUrl = `http://141.164.40.222:5000/users?q=${query}`;
    return await axios.get(searchUrl);
  } catch (e) {
    throw new Error(e);
  }
};

export const filterUserApi = async (value) => {
  try {
    const filterUrl = `http://141.164.40.222:5000/users?status=${value}`;
    return await axios.get(filterUrl);
  } catch (e) {
    throw new Error(e);
  }
};
