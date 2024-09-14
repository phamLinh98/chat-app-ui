// const secretKey = import.meta.env.VITE_DOMAIN;
// import CryptoJS from "crypto-js";
// import { Navigate } from "react-router-dom";
// // eslint-disable-next-line react/prop-types
// export const AuthenticationComponent = ({ children }) => {
//   const encryptedAuth = localStorage.getItem("isAuthenticated");
//   if (encryptedAuth) {
//     const decryptedAuth = CryptoJS.AES.decrypt(
//       encryptedAuth,
//       secretKey
//     ).toString(CryptoJS.enc.Utf8);
//     return decryptedAuth === "true" ? children : <Navigate to="/login" />;
//   }
//   return <Navigate to="/login" />;
// };
