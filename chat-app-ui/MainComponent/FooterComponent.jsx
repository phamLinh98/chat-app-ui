import { Footer } from "antd/es/layout/layout";
import InputComponent from "../SideComponent/InputComponent";
import { useParams } from "react-router-dom";
import AvatarComponent from "../SideComponent/AvatarComponent";
import anh222 from "../public/image/6.jpeg";
import CryptoJS from "crypto-js";
const secretKey = import.meta.env.VITE_DOMAIN;

export const FooterComponent = () => {
  const { userId } = useParams();
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  const loginUserInfo = JSON.parse(decryptedAuth);
  const { name } = loginUserInfo;

  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      {userId !== undefined ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <AvatarComponent
            color="red"
            icon={name.charAt(0)}
            size="14"
            src={anh222}
          />
          <InputComponent placeholder={'Hãy nhập tin nhắn'}/>
        </div>
      ) : (
        ""
      )}
    </Footer>
  );
};
