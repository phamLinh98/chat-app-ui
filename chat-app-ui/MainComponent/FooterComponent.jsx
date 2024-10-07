import { Footer } from "antd/es/layout/layout";
import InputComponent from "../SideComponent/InputComponent";
import { useParams } from "react-router-dom";
import AvatarComponent from "../SideComponent/AvatarComponent";
import CryptoJS from "crypto-js";
import { useContext, useState } from "react";
import { SortedContentsContext } from "./SortedContentsContext";
import { get, postChatData } from "../utils/api";
import useSWR from "swr";
const secretKey = import.meta.env.VITE_DOMAIN;

export const FooterComponent = () => {
  const { userId } = useParams();
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  const loginUserInfo = JSON.parse(decryptedAuth);
  const { name, avatar, namelogin } = loginUserInfo;
  const { indexfind } = useContext(SortedContentsContext);
  const [content, setContent] = useState(""); // State để lưu nội dung nhập
  const {data, mutate} = useSWR("/api/chat", get);
  const handleInputChange = (value) => {
    setContent(value); // Cập nhật giá trị nhập
  };

  const handleSubmit = async () => {
    if (!content.trim()) return; // Không gửi nếu nội dung trống

    const newData = {
      id: indexfind,
      avatar: avatar,
      name: namelogin,
      content: content,
    };

    try {
      await mutate(postChatData("/api/add-chat", newData),{
        optimisticData:[...data, newData ],
        rollbackOnError:true,
        populateCache:true,
        revalidate:false
      }); // Gọi API để submit tin nhắn
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
            value={content} // Truyền giá trị của input xuống InputComponent
            placeholder="Hãy nhập tin nhắn"
            onInputChange={handleInputChange}
            onSubmit={handleSubmit} // Submit khi người dùng nhấn "Enter" hoặc click "Gửi"
          />
        </div>
      ) : (
        ""
      )}
    </Footer>
  );
};
