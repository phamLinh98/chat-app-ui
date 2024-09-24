import { Col, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { SmallAvatarComponent } from "../SideComponent/AvatarComponent";
// import CryptoJS from "crypto-js";
import useSWR from "swr";
import { get } from "../utils/api";
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
      ? { nameshow: user.nameshow, avatar: user.avatar }
      : "User Not Exist";
  };

  const userNow = getUserNameById(userId);

  return (
    <>
      <Row justify="start">
        <Col span={6}>
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyContent: "flex-start", // Đảm bảo căn lề trái
            }}
          >
            <SmallAvatarComponent
              size={18}
              icon={userNow.nameshow.charAt(0)}
              color="orange"
              src={userNow.avatar}
            />
            <AlertComponent message={"Ok em ơi"} type="error" />
            <HeartOutlined />
          </div>
        </Col>
      </Row>
      <Row justify="end">
        <Col span={6}>
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyContent: "flex-end", // Căn lề phải
            }}
          >
            <HeartOutlined />
            <AlertComponent message={"Ok anh ơi"} type="info" />
            <SmallAvatarComponent
              size={18}
              color="red"
              icon={namelogin.charAt(0)}
              src={avatar}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default MessengerComponent;
