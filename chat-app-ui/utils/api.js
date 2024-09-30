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
    throw new Error("Network response was not ok");
  }

  const data = await response.json(); // Chuyển đổi response thành JSON
  return data;
};

export const getDataFollowNameLogin = async (route) => {
  const url = `${envConfig.host}${route}`;
  const { namelogin } = getDataFromLocalStorage();
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      namelogin: namelogin,
    },
  });
  return data;
};

export const getChatDoubleUser = async (route, namelogin1, namelogin2) => {
  const url = `${envConfig.host}${route}`; // URL API backend của bạn
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namelogin1: namelogin1,
        namelogin2: namelogin2,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Trả về dữ liệu nhận được từ backend
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return null; // Xử lý lỗi nếu có
  }
};

//update like heart
export const updateLikedStatus = async (
  route,
  namelogin1,
  namelogin2,
  key,
  liked
) => {
  const url = `${envConfig.host}${route}`; // URL API backend của bạn
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namelogin1: namelogin1, // Tên người dùng 1
        namelogin2: namelogin2, // Tên người dùng 2
        key: key, // Key của message cần đảo ngược liked
        liked: liked, // Trạng thái liked hiện tại
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Trả về dữ liệu nhận được từ backend
  } catch (error) {
    console.error("Error updating liked status:", error);
    return null; // Xử lý lỗi nếu có
  }
};

//add new chat
export const postChatData = async (route, data) => {
  const url = `${envConfig.host}${route}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result; // Trả về kết quả từ API
  } catch (error) {
    console.error("Error posting chat data:", error);
    throw error; // Ném lỗi ra để xử lý ở phía trên
  }
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
