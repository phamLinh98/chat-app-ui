import { Footer } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SortedContentsContext } from "./SortedContentsContext";
import { getChatDoubleUser, postChatData } from "../utils/api";
import { useGetUserFromDashboard } from "./GetUserFromDashboard";
import InputComponent from "../SideComponent/InputComponent";

export const FooterComponent = () => {
  const { userId } = useParams();
  const { userClickNow, namelogin, avatar } = useGetUserFromDashboard(userId);
  const { indexfind } = useContext(SortedContentsContext);
  const [content, setContent] = useState("");

  // eslint-disable-next-line no-unused-vars
  const { contextUserLoginAndUserClicked, setContextUserLoginAndUserClicked } =
    useContext(SortedContentsContext);

  useEffect(() => {
    const fetchDataChat = async () => {
      // Kiểm tra xem namelogin và userClickNow.namelogin có hợp lệ hay không
      if (namelogin && userClickNow?.namelogin) {
        const responseDataChat = await getChatDoubleUser(
          "/api/get-chat-double-user",
          namelogin,
          userClickNow.namelogin
        );

        if (responseDataChat) {
          const data = await responseDataChat.json();
          setContextUserLoginAndUserClicked(data);
        } else {
          console.error("Failed to fetch chat data.");
        }
      } else {
        console.error("Invalid login details.");
      }
    };

    fetchDataChat();
  }, [namelogin, setContextUserLoginAndUserClicked, userClickNow.namelogin]);

  let autoIncrementKey = 0;
  const handleSubmit = async () => {
    if (!content.trim()) return;
    const newData = {
      id: indexfind,
      avatar: avatar,
      name: namelogin,
      key: autoIncrementKey + 1,
      content: content,
    };

    try {
      const { updatedContents = null } = await postChatData(
        "/api/add-chat",
        newData
      );
      // Kiểm tra xem response có đúng định dạng không
      if (updatedContents) {
        // Hoặc điều kiện kiểm tra khác
        setContextUserLoginAndUserClicked({ contents: updatedContents });
        setContent("");
      } else {
        console.error("Invalid response format", updatedContents);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Footer style={{ textAlign: "center" }}>
      {userId !== undefined ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <InputComponent
            content={content} 
            onChange={setContent} 
            onClickButtonSubmit={handleSubmit}
          />
        </div>
      ) : (
        ""
      )}
    </Footer>
  );
};
