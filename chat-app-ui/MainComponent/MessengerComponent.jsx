import { Col, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { SmallAvatarComponent } from "../SideComponent/AvatarComponent";
import { get, getChatDoubleUser } from "../utils/api";
import { findChatIndex } from "../utils/findIndexUser";
import { useContext, useEffect, useRef, useState } from "react";
import { SortedContentsContext } from "./SortedContentsContext";
import { useGetUserFromDashboard } from "./GetUserFromDashboard";

const MessengerComponent = () => {
  // Get userId from URL
  const { userId } = useParams();

  const scrollRef = useRef(null);
  // State data for api/chat
  const [chatDataFromTableChat, setChatDataFromTableChat] = useState(null);
  // Custom Hook get info login user and who is chatting with her/him
  const { infoUserFromTableInfo, userClickNow, namelogin, avatar } =
    useGetUserFromDashboard(userId);

  useEffect(() => {
    const fetchDataChat = async () => {
      const responseDataChat = await get("/api/chat");
      const data = await responseDataChat.json();
      setChatDataFromTableChat(data);
    };
    fetchDataChat();
  }, []);

  // update contextUserLoginAndUserClicked to SortComponetConnext for any other component can connect or update to contextUserLoginAndUserClicked
  // contextUserLoginAndUserClicked is chatting content of login user and user clicked
  const { contextUserLoginAndUserClicked, setContextUserLoginAndUserClicked } =
    useContext(SortedContentsContext);

  // Khi có cuộc trò chuyện mới tự động cuộn xuống dưới cùng
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [contextUserLoginAndUserClicked]); // Chạy effect khi có nội dung mới

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

  // Chạy update lại nội dung trò chuyện sau mỗi 10 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (namelogin && userClickNow?.namelogin) {
        getChatDoubleUser(
          "/api/get-chat-double-user",
          namelogin,
          userClickNow.namelogin
        )
          .then((response) => response.json())
          .then((data) => {
            // Kiểm tra nếu dữ liệu mới khác với dữ liệu cũ
            if (
              JSON.stringify(data) !==
              JSON.stringify(contextUserLoginAndUserClicked)
            ) {
              setContextUserLoginAndUserClicked(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching chat data:", error);
          });
      }
    }, 10000); // 10 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [
    namelogin,
    userClickNow,
    contextUserLoginAndUserClicked,
    setContextUserLoginAndUserClicked,
  ]);

  // Tìm kiếm Chat Index từ DB thông qua tài khoản login và user chỉ định từ dashboard
  const chatIndex = findChatIndex(
    chatDataFromTableChat,
    namelogin,
    userClickNow.namelogin
  );
  // When login use wanna change user clicked in dashboard , this us get that user index
  const { setIndex } = useContext(SortedContentsContext);

  useEffect(() => {
    if (chatIndex) {
      setIndex(chatIndex);
    }
  }, [chatIndex, setIndex]);

  //Nếu data chưa được fetch thành công thì Loading...
  if (!infoUserFromTableInfo || !contextUserLoginAndUserClicked) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={scrollRef}
      className="messenger-scroll"
      style={{ maxHeight: "700px", overflowY: "auto", paddingRight: "10px" }}
    >
      {contextUserLoginAndUserClicked.contents.map((message) => {
        const isReceiver = message.name === namelogin;
        const isSender = message.name === userClickNow.namelogin;
        if (!isSender && !isReceiver) return null;
        return (
          <Row key={message.key} justify={isSender ? "start" : "end"}>
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
    </div>
  );
};
export default MessengerComponent;
