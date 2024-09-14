<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  ButtonLoginComponent,
  ButtonSignInComponent,
} from "../SideComponent/ButtonComponent";
import { Flex } from "antd";
import FormComponent from "../SideComponent/FormComponent";
import.meta.env.VITE_DOMAIN;
const listUser = [
  {
    id: "1877",
    email: "linhthusinh98@gmail.com",
    namelogin: "linhthusinh",
    nameshow: "Phạm Tuấn Linh",
    avatar: "image",
    department: "IT",
    password: "linhthusinh",
    job: "employee",
  },
  {
    id: "1878",
    namelogin: "izukanamiho",
    nameshow: "Izuka Namiho",
    email: "linhthusinh98@gmail.com",
    avatar: "image",
    department: "HR",
    password: "password",
    job: "employee",
  },
  {
    id: "1879",
    namelogin: "tonngokong",
    nameshow: "Tôn Ngộ Không",
    email: "linhthusinh98@gmail.com",
    avatar: "image",
    department: "HR",
    password: "password",
    job: "employee",
  },
  {
    id: "1880",
    namelogin: "hanbaoquan",
    nameshow: "Hàn Bảo Quân",
    email: "linhthusinh98@gmail.com",
    avatar: "image",
    department: "HR",
    password: "password",
    job: "employee",
  },
  {
    id: "1881",
    namelogin: "doantribinh",
    nameshow: "Doãn Trí Bình",
    email: "linhthusinh98@gmail.com",
    avatar: "image",
    department: "HR",
    password: "password",
    job: "employee",
  },
  {
    id: "1882",
    namelogin: "kawaguchisatoshi",
    nameshow: "Kawaguchi Satoshi",
    email: "linhthusinh98@gmail.com",
    avatar: "image",
    department: "HR",
    password: "password",
    job: "employee",
  },
];

const LoginComponent = () => {
  const [namelogin, setNameLogin] = useState("");
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
        navigate("/", { state: { myData: "some data" } });
      }
    }
  }, [navigate, secretKey]);
=======
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CryptoJS from "crypto-js";
// import {
//   ButtonLoginComponent,
//   ButtonSignInComponent,
// } from "../SideComponent/ButtonComponent";
// import { Flex } from "antd";
// import FormComponent from "../SideComponent/FormComponent";
// import useSWR from "swr";
// import.meta.env.VITE_DOMAIN;

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const LoginComponent = () => {
//   const [namelogin, setNameLogin] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const secretKey = import.meta.env.VITE_DOMAIN;
//   //fetch api 
//   // eslint-disable-next-line no-unused-vars
//   const { data, error } = useSWR("http://localhost:4000/info", fetcher);
//   console.log('data :>> ', data);
//   useEffect(() => {
//     const encryptedAuth = localStorage.getItem("isAuthenticated");
//     if (encryptedAuth) {
//       const decryptedAuth = CryptoJS.AES.decrypt(
//         encryptedAuth,
//         secretKey
//       ).toString(CryptoJS.enc.Utf8);
//       if (decryptedAuth === "true") {
//         navigate("/");
//       }
//     }
//   }, [navigate, secretKey]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
>>>>>>> dbdf5fcac78183f09582136b6fd4181bbbf32c2b

//     const user = data.find(
//       (u) => u.namelogin === namelogin && u.password === password
//     );
   
//     if (user) {
//       const encryptedAuth = CryptoJS.AES.encrypt("true", secretKey).toString();
//       localStorage.setItem("isAuthenticated", encryptedAuth);

<<<<<<< HEAD
    const user = listUser.find(
      (u) => u.namelogin === namelogin && u.password === password
    );

    if (user) {
      const encryptedAuth = CryptoJS.AES.encrypt("true", secretKey).toString();
      localStorage.setItem("isAuthenticated", encryptedAuth);
      navigate("/", { state: { myData: "some data" } });
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
=======
//       const loginDataInfo = {
//         nameshow: user.nameshow,
//         id: user.id,
//         namelogin: user.namelogin,
//         avatar: user.avatar,
//       };

//       navigate("/", {
//         state: loginDataInfo,
//       });

//     } else {
//       alert("Tên đăng nhập hoặc mật khẩu không đúng");
//     }
//   };
>>>>>>> dbdf5fcac78183f09582136b6fd4181bbbf32c2b

//   return (
//     <div
//       style={{
//         maxWidth: "400px",
//         margin: "auto",
//         padding: "20px",
//         textAlign: "left",
//       }}
//     >
//       <FormComponent>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Tên đăng nhập:</label>
//             <input
//               type="text"
//               value={namelogin}
//               onChange={(e) => setNameLogin(e.target.value)}
//               style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
//             />
//           </div>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Mật khẩu: </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
//             />
//           </div>
//           <Flex gap="5px" wrap>
//             <ButtonLoginComponent
//               name={"Login"}
//               typeSubmit={"submit"}
//               type={"primary"}
//             />
//             <ButtonSignInComponent
//               name={"Signin"}
//               typeSubmit={() => alert("Disabled")}
//             />
//           </Flex>
//         </form>
//       </FormComponent>
//     </div>
//   );
// };

// export default LoginComponent;
