import { envConfig } from "../config/envConfig";

export const get = async (route) => {
  const url = `${envConfig.host}${route}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data; //dummy data, no phu thuoc hoan toan vao data tu BE
};
export const getDataUserAfterLogin = async (route) => {
  const url = `${envConfig.host}${route}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.map(({ id, namelogin, nameshow, email, avatar, department }) => ({
    id,
    namelogin,
    nameshow,
    email,
    avatar,
    department,
  }));
};

export const post = async (route, data) => {
  const url = `${envConfig.host}${route}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const put = async (route, data) => {
  const url = `${envConfig.host}${route}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const del = async (route) => {
  const url = `${envConfig.host}${route}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
