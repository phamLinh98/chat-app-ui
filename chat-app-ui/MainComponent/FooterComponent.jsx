import { Footer } from "antd/es/layout/layout";
import InputComponent from "../SideComponent/InputComponent";
import { useParams } from "react-router-dom";
import AvatarComponent from "../SideComponent/AvatarComponent";
import CryptoJS from "crypto-js";
import { useContext, useState } from "react";
import { SortedContentsContext } from "./SortedContentsContext";
import { postChatData } from "../utils/api";
const secretKey = import.meta.env.VITE_DOMAIN;

export const FooterComponent = () => {
  const { userId } = useParams();
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  const loginUserInfo = JSON.parse(decryptedAuth);
  const { id, name, avatar, namelogin } = loginUserInfo;
  const { indexfind } = useContext(SortedContentsContext);
  const [content, setContent] = useState("");

  const handleInputChange = (value) => {
    setContent(value); // Cập nhật giá trị nhập
  };

  const handleSubmit = async () => {
    if (!content.trim()) return; // Không gửi nếu nội dung trống

    const data = {
      id: indexfind,
      avatar: avatar,
      name: namelogin,
      content: content,
      isUser: id,
    };

    try {
      const result = await postChatData("/api/add-chat", data); // Gọi API để submit tin nhắn
      console.log("Message sent successfully:", result);
      setContent(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Footer style={{ textAlign: "center" }}>
      {userId !== undefined ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <AvatarComponent
            color="red"
            icon={name.charAt(0)}
            size="14"
            src={avatar}
          />
          <InputComponent
            placeholder="Hãy nhập tin nhắn"
            onInputChange={handleInputChange}
            onSubmit={handleSubmit} // Submit when the user presses enter or clicks "Gửi"
          />
        </div>
      ) : (
        ""
      )}
    </Footer>
  );
};
