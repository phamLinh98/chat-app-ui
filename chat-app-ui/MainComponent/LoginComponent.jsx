import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../src/component.css";
import {
  ButtonLoginComponent,
  ButtonSignInComponent,
} from "../SideComponent/ButtonComponent";
import { Flex } from "antd";
import FormComponent from "../SideComponent/FormComponent";

const secretKey = import.meta.env.VITE_DOMAIN;
import { get } from "./../utils/api.js";
import SpinComponent from "../SideComponent/SpinComponent.jsx";

const LoginComponent = () => {
  const [namelogin, setNameLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [listUser, setListUser] = useState(null); // State to store fetched users
  const [loading, setLoading] = useState(false); // State for loading spinner
  const handlePlaceholderName = isFocusedName ? "Hãy Nhập Tên Đăng Nhập" : "";
  const handlePlaceholderPassword = isFocusedPassword
    ? "Hãy Nhập Mật Khẩu"
    : "";

  const navigate = useNavigate();

  // Fetch function
  const fetcher = async () => {
    setLoading(true);
    try {
      const res = await get("/api/info");
      const data = await res.json();
      setListUser(data); // Store the fetched user list in state
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch data when the form is submitted
    await fetcher();

    if (!listUser) return; // Ensure listUser is fetched before proceeding

    const user = listUser.find((u) => u.namelogin === namelogin);

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

  if (loading)
    return (
      <div>
        <SpinComponent />
      </div>
    );

  const handleFocusName = () => {
    setIsFocusedName(true);
  };

  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

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
              placeholder={handlePlaceholderName}
              onChange={(e) => setNameLogin(e.target.value)}
              onFocus={handleFocusName}
              style={{
                width: "100%",
                padding: "8px 0 8px 2px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Mật khẩu: </label>
            <input
              type="password"
              value={password}
              placeholder={handlePlaceholderPassword}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocusPassword}
              style={{
                width: "100%",
                padding: "8px 0 8px 2px",
              }}
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
              typeSubmit={() => alert("Tính năng tạm thời disabled")}
            />
          </Flex>
        </form>
      </FormComponent>
    </div>
  );
};

// Protect route
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
