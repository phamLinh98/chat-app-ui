import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import ButtonComponent from "../SideComponent/ButtonComponent";
import { Flex } from "antd";
import FormComponent from "../SideComponent/FormComponent";
import.meta.env.VITE_DOMAIN;

const listUser = [
  {
    id: 1877,
    username: "admin",
    nameshow: "Administrator",
    password: "password",
  },
  {
    id: 1878,
    username: "Hazuki",
    nameshow: "Hazuki",
    password: "Hazuki",
  },
];

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const secretKey = import.meta.env.VITE_DOMAIN;

  useEffect(() => {
    const encryptedAuth = localStorage.getItem("isAuthenticated");
    if (encryptedAuth) {
      const decryptedAuth = CryptoJS.AES.decrypt(
        encryptedAuth,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedAuth === "true") {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, secretKey]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = listUser.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const encryptedAuth = CryptoJS.AES.encrypt("true", secretKey).toString();
      localStorage.setItem("isAuthenticated", encryptedAuth);
      navigate("/", {
        replace: true,
        state: { username: user.nameshow, id: user.id },
      });
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng");
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <ButtonComponent
              name={"Login"}
              typeSubmit={"submit"}
              type={"primary"}
            />
            <ButtonComponent
              name={"Signin"}
              typeSubmit={() => alert("Disabled")}
            />
          </Flex>
        </form>
      </FormComponent>
    </div>
  );
};

export default LoginComponent;
