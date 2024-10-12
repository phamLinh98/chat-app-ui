import { useEffect, useState } from "react";
import { get } from "../utils/api";
import { getDataFromLocalStorage } from "../utils/getDataFromLocalStorage";

// custom Hook get info user login with user is chatting with her/him
export const useGetUserFromDashboard = (userId) => {
  const [infoUserFromTableInfo, setInfoUserFromTableInfo] = useState(null);
  
  useEffect(() => {
    const fetchDataChat = async () => {
      try {
        const responseDataChat = await get("/api/info");
        const data = await responseDataChat.json();
        setInfoUserFromTableInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataChat();
  }, []);

  // get info login user from local storage
  const { namelogin, avatar } = getDataFromLocalStorage();

  // Lấy userName từ Id
  const getUserNameById = (userId) => {
    if (!infoUserFromTableInfo || !Array.isArray(infoUserFromTableInfo)) {
      return "User Not Exist";
    }

    const user = infoUserFromTableInfo.find(
      (item) => String(item.id) === String(userId)
    );

    return user
      ? {
          nameshow: user.nameshow,
          avatar: user.avatar,
          namelogin: user.namelogin,
        }
      : "User Not Exist";
  };

  // get user is chatting with login user , and return info of her/him 
  const userClickNow = getUserNameById(userId);

  return {
    infoUserFromTableInfo,
    userClickNow,
    namelogin,
    avatar,
  };
};
