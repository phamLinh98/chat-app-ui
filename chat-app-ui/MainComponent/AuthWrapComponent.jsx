<<<<<<< HEAD:chat-app-ui/MainComponent/AuthWrapComponent.jsx
const secretKey = import.meta.env.VITE_DOMAIN;
import CryptoJS from "crypto-js";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export const  AuthWrapperComponent = ({ children }) => {
  const encryptedAuth = localStorage.getItem("isAuthenticated");
  if (encryptedAuth) {
    const decryptedAuth = CryptoJS.AES.decrypt(
      encryptedAuth,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return decryptedAuth === "true" ? children : <Navigate to="/login" />;
  }
  return <Navigate to="/login" />;
};

export default AuthWrapperComponent;
=======
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
>>>>>>> dbdf5fcac78183f09582136b6fd4181bbbf32c2b:chat-app-ui/MainComponent/PrivateComponent.jsx
