import { Col, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { SmallAvatarComponent } from "../SideComponent/AvatarComponent";
import useSWR from "swr";
import { get, getChatDoubleUser } from "../utils/api";
import { getDataFromLocalStorage } from "../utils/getDataFromLocalStorage";
import { findChatIndex } from "../utils/findIndexUser";
import { useContext, useEffect, useState } from "react";
import { SortedContentsContext } from "./SortedContentsContext";

const MessengerComponent = () => {
  // const [liked, setLiked] = useState(false);
  const { userId } = useParams();
  const fetcher = (url) => get(url).then((res) => res.json());
  const { data: infoUserFromTableInfo, error } = useSWR("/api/info", fetcher);

  const [infoUser, setInfoUser] = useState(null);

  useEffect(() => {
    if (infoUserFromTableInfo) {
      setInfoUser(infoUserFromTableInfo);
    }
  }, [infoUserFromTableInfo]);

  //Get list data chatDataFromTableChat
  // eslint-disable-next-line no-unused-vars
  const { data: chatDataFromTableChat, error: chatDataFromTableChatError } =
    useSWR("/api/chat", fetcher); 

  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    if (chatDataFromTableChat) {
      setChatUser(chatDataFromTableChat);
      mutate("/api/chat")
    }
  }, [chatDataFromTableChat]);
  
  // get data chat table
  const { namelogin, avatar } = getDataFromLocalStorage();

  // Lấy userName từ Id
  const getUserNameById = (userId) => {
    const user = infoUserFromTableInfo.find(
      (item) => String(item.id) === String(userId)
    );
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

  // Sử dụng useSWR với getChatDoubleUser
  const { data: contextUserLoginAndUserClicked, error: chatError } = useSWR(
    [`/api/get-chat-double-user`, namelogin, userClickNow.namelogin],
    ([route, namelogin1, namelogin2]) =>
      getChatDoubleUser(route, namelogin1, namelogin2)
  );

  const [clicked, setClicked] = useState(null)
  useEffect(() => {
    if (contextUserLoginAndUserClicked) {
      setClicked(contextUserLoginAndUserClicked);
      mutate("/api/chat")
    }
  }, [contextUserLoginAndUserClicked]);

  // Tìm kiếm Chat Index từ DB thông qua tài khoản login và user chỉ định từ dashboard
  const chatIndex = findChatIndex(
    chatDataFromTableChat,
    namelogin,
    userClickNow.namelogin
  );

  // eslint-disable-next-line no-unused-vars
  const { indexfind, setIndex } = useContext(SortedContentsContext);
  useEffect(() => {
    if (chatIndex) {
      setIndex(chatIndex);
      mutate("/api/chat")
    }
  }, [chatIndex, setIndex]);

  // Xử lý lỗi hoặc chờ dữ liệu
  if (error || chatError) {
    return <div>Error loading data...</div>;
  }

  //Nếu data chưa được fetch thành công thì Loading...
  if (!infoUserFromTableInfo || !contextUserLoginAndUserClicked) {
    return <div>Loading...</div>;
  }

  const sortedContents = Array.isArray(contextUserLoginAndUserClicked.contents)
    ? contextUserLoginAndUserClicked.contents.sort((a, b) => a.time - b.time)
    : [];

  return (
    <>
      {sortedContents.map((message) => {
        const isSender = message.name === namelogin;
        const isReceiver = message.name === userClickNow.namelogin;
        if (!isSender && !isReceiver) return null; // Không phải là người gửi hoặc nhận
        return (
          <Row key={message.key} justify={isSender ? "start" : "end"}>
            {/* nếu giá trị mà kiểm tra đúng là là namelogin thì vã nó là start còn không thì là end */}
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: isSender ? "flex-start" : "flex-end", // Căn lề trái hoặc phải dựa trên người gửi
                }}
              >
                {isReceiver && (
                  <>
                      <AlertComponent message={message.content} type="error" />
                    <SmallAvatarComponent
                      size={18}
                      color="red"
                      icon={namelogin.charAt(0)}
                      src={avatar}
                    />
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
        );
      })}
    </>
  );
};
export default MessengerComponent;
