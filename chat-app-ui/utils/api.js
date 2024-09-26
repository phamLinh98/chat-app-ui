import { envConfig } from "../config/envConfig";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage";

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

export const getUserLoginIfExists = async (route, namelogin, password) => {
  const url = `${envConfig.host}${route}`;
  const response = await fetch(url, {
    method: "POST", // Sử dụng POST để gửi dữ liệu
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ namelogin, password }), // Gửi dữ liệu người dùng trong body
  });

  if (!response.ok) {
    // Nếu có lỗi từ server (ví dụ: 404, 500), xử lý ở đây
    throw new Error('Network response was not ok');
  }

  const data = await response.json(); // Chuyển đổi response thành JSON
  return data;
};

export const getDataFollowNameLogin = async (route) => {
  const url = `${envConfig.host}${route}`;
  const {namelogin} = getDataFromLocalStorage();
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      namelogin: namelogin,
    },
  });
  return data;
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
