import CryptoJS from "crypto-js";
const secretKey = import.meta.env.VITE_DOMAIN;

export const getDataFromLocalStorage = () => {
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );

  const loginUserInfo = JSON.parse(decryptedAuth);

  // get login info from local storage
  const { namelogin, avatar, id } = loginUserInfo;

  return { namelogin, avatar, id };
};
