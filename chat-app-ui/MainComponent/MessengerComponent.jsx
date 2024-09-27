import { Col, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { SmallAvatarComponent } from "../SideComponent/AvatarComponent";
// import CryptoJS from "crypto-js";
import useSWR from "swr";
import { get, getChatDoubleUser } from "../utils/api";
import { getDataFromLocalStorage } from "../utils/getDataFromLocalStorage";

const MessengerComponent = () => {
  const { userId } = useParams();
  const fetcher = (url) => get(url).then((res) => res.json());
  // eslint-disable-next-line no-unused-vars
  const { data: itemsData, error } = useSWR("/api/info", fetcher);

  const { namelogin, avatar } = getDataFromLocalStorage();

  const getUserNameById = (userId) => {
    const user = itemsData.find((item) => String(item.id) === String(userId));
    return user
      ? {
          nameshow: user.nameshow,
          avatar: user.avatar,
          namelogin: user.namelogin,
        }
      : "User Not Exist";
  };

  const userNow = getUserNameById(userId);
  // Sử dụng useSWR với getChatDoubleUser
  const { data: chatData, error: chatError } = useSWR(
    [`/api/get-chat-double-user`, namelogin, userNow.namelogin],
    ([route, namelogin1, namelogin2]) =>
      getChatDoubleUser(route, namelogin1, namelogin2)
  );

  // Xử lý lỗi hoặc chờ dữ liệu
  if (error || chatError) {
    return <div>Error loading data...</div>;
  }

  if (!itemsData || !chatData) {
    return <div>Loading...</div>;
  }

  const sortedContents = Array.isArray(chatData.contents)
    ? chatData.contents.sort((a, b) => a.time - b.time)
    : [];

  return (
    <>
      {sortedContents.map((message) => {
        const isSender = message.name === namelogin;
        const isReceiver = message.name === userNow.namelogin;
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
                    <HeartOutlined />
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
                      icon={userNow.nameshow.charAt(0)}
                      color="orange"
                      src={userNow.avatar}
                    />
                    <AlertComponent message={message.content} type="info" />
                    <HeartOutlined />
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
