import { envConfig } from "../config/envConfig";

export const get = async (route) => {
  const url = `${envConfig.host}${route}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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