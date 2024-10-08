import { Col, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { SmallAvatarComponent } from "../SideComponent/AvatarComponent";
import { get, getChatDoubleUser, postChatData } from "../utils/api";
import { getDataFromLocalStorage } from "../utils/getDataFromLocalStorage";
import { findChatIndex } from "../utils/findIndexUser";
import { useContext, useEffect, useState } from "react";
import { SortedContentsContext } from "./SortedContentsContext";

const MessengerComponent = () => {
  const { userId } = useParams();
  //Get list data chatDataFromTableChat
  const [chatDataFromTableChat, setChatDataFromTableChat] = useState(null);
  const [infoUserFromTableInfo, setInfoUserFromTableInfo] = useState(null);
  // const [content, setContent] = useState("");

  useEffect(() => {
    const fetchDataChat = async () => {
      const responseDataChat = await get("/api/chat");
      const data = await responseDataChat.json();
      setChatDataFromTableChat(data);
    };
    fetchDataChat();
  }, []);

  useEffect(() => {
    const fetchDataChat = async () => {
      try {
        const responseDataChat = await get("/api/info");
        const data = await responseDataChat.json();
        setInfoUserFromTableInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataChat();
  }, []);

  const { namelogin, avatar } = getDataFromLocalStorage();

  // Lấy userName từ Id
  const getUserNameById = (userId) => {
    if (!infoUserFromTableInfo || !Array.isArray(infoUserFromTableInfo)) {
      return "User Not Exist";
    }

    const user = infoUserFromTableInfo.find((item) => String(item.id) === String(userId));

    return user
      ? {
          nameshow: user.nameshow,
          avatar: user.avatar,
          namelogin: user.namelogin,
        }
      : "User Not Exist";
  };

  // Kiểm tra user nào đang được click
  const userClickNow = getUserNameById(userId);

  const [contextUserLoginAndUserClicked, setContextUserLoginAndUserClicked] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namelogin, userClickNow.namelogin]);

  // Tìm kiếm Chat Index từ DB thông qua tài khoản login và user chỉ định từ dashboard
  const chatIndex = findChatIndex(chatDataFromTableChat, namelogin, userClickNow.namelogin);

  const { indexfind, setIndex } = useContext(SortedContentsContext);

  useEffect(() => {
    if (chatIndex) {
      setIndex(chatIndex);
    }
  }, [chatIndex, setIndex]);

  const handleSubmit = async () => {
    const newData = {
      id: indexfind,
      avatar: avatar,
      name: namelogin,
      content: "Cam on vi tat >> " + Math.random(),
    };

    try {
      const { updatedContents = null } = await postChatData("/api/add-chat", newData);

      // Kiểm tra xem response có đúng định dạng không
      if (updatedContents) {
        // Hoặc điều kiện kiểm tra khác
        setContextUserLoginAndUserClicked({ contents: updatedContents });
      } else {
        console.error("Invalid response format", updatedContents);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //Nếu data chưa được fetch thành công thì Loading...
  if (!infoUserFromTableInfo || !contextUserLoginAndUserClicked) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {contextUserLoginAndUserClicked.contents.map((message) => {
        // thêm index vào đây để tránh cảnh báo
        const isSender = message.name === namelogin;
        const isReceiver = message.name === userClickNow.namelogin;
        if (!isSender && !isReceiver) return null;
        return (
          <>
            <Row key={message.id} justify={isSender ? "start" : "end"}>
              <Col span={6}>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: isSender ? "flex-start" : "flex-end",
                  }}
                >
                  {isReceiver && (
                    <>
                      <AlertComponent message={message.content} type="error" />
                      <SmallAvatarComponent size={18} color="red" icon={namelogin.charAt(0)} src={avatar} />
                    </>
                  )}
                  {isSender && (
                    <>
                      <SmallAvatarComponent
                        size={18}
                        icon={userClickNow.nameshow.charAt(0)}
                        color="orange"
                        src={userClickNow.avatar}
                      />
                      <AlertComponent message={message.content} type="info" />
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </>
        );
      })}
      <button onClick={handleSubmit}>Click</button>
    </>
  );
};
export default MessengerComponent;
