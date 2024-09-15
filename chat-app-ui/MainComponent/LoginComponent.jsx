import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import useSWR from "swr";
import {
  ButtonLoginComponent,
  ButtonSignInComponent,
} from "../SideComponent/ButtonComponent";
import { Flex } from "antd";
import FormComponent from "../SideComponent/FormComponent";

const secretKey = import.meta.env.VITE_DOMAIN;
import { get } from "./../utils/api.js";
import SpinComponent from "../SideComponent/SpinComponent.jsx";

// Hàm fetcher cho SWR
const fetcher = (url) => get(url).then((res) => res.json());

const LoginComponent = () => {
  const [namelogin, setNameLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { data: listUser, error } = useSWR("/info", fetcher);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = listUser.find(
      (u) => u.namelogin === namelogin && u.password === password
    );

    if (user) {
      const encryptedAuth = CryptoJS.AES.encrypt("true", secretKey).toString();
      localStorage.setItem("isAuthenticated", encryptedAuth);

      const userData = {
        id: user.id,
        name: user.nameshow,
        namelogin: user.namelogin,
        avatar: user.avatar,
        department: user.department,
        job: user.job,
      };

      const encryptedUserData = CryptoJS.AES.encrypt(
        JSON.stringify(userData),
        secretKey
      ).toString();
      localStorage.setItem("userData", encryptedUserData);

      navigate("/");
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  useEffect(() => {
    const encryptedAuth = localStorage.getItem("isAuthenticated");
    if (encryptedAuth) {
      const decryptedAuth = CryptoJS.AES.decrypt(
        encryptedAuth,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedAuth === "true") {
        navigate("/");
      }
    }
  }, [navigate]);

  if (!listUser)
    return (
      <div>
        <SpinComponent />
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "left",
      }}
    >
      <FormComponent>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Tên đăng nhập:</label>
            <input
              type="text"
              value={namelogin}
              onChange={(e) => setNameLogin(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Mật khẩu: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <Flex gap="5px" wrap>
            <ButtonLoginComponent
              name={"Login"}
              typeSubmit={"submit"}
              type={"primary"}
            />
            <ButtonSignInComponent
              name={"Signin"}
              typeSubmit={() => alert("Disabled")}
            />
          </Flex>
        </form>
      </FormComponent>
    </div>
  );
};

//Co che protect route
// eslint-disable-next-line react/prop-types
export const AuthWrapperComponent = ({ children }) => {
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

export default LoginComponent;
