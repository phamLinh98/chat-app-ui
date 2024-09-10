import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
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
    return ()=> {console.log('Login Thành Công');}
  }, [navigate, secretKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = listUser.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const encryptedAuth = CryptoJS.AES.encrypt("true", secretKey).toString();
      localStorage.setItem("isAuthenticated", encryptedAuth);
      // Redirect to the dashboard and replace history
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
      <h2>Proterial Login</h2>
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
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate("/signin")}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          Sign-In
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
