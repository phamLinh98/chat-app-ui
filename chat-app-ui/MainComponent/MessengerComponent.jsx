import { Col, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { SmallAvatarComponent } from "../SideComponent/AvatarComponent";
import CryptoJS from "crypto-js";
const secretKey = import.meta.env.VITE_DOMAIN;

const MessengerComponent = () => {
  const { userId } = useParams();
  const itemsData = [
    {
      id: 1878,
      namelogin: "izukanamiho",
      nameshow: "Izuka Namiho",
      email: "izukanamiho@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employee",
    },
    {
      id: 1879,
      namelogin: "tonngokong",
      nameshow: "Tôn Ngộ Không",
      email: "tonngokhong@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "MGR",
      job: "manager",
    },
    {
      id: 1880,
      namelogin: "hanbaoquan",
      nameshow: "Hàn Bảo Quân",
      email: "hanbaoquan@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employeer",
    },
    {
      id: 1881,
      namelogin: "doantribinh",
      nameshow: "Doãn Trí Bình",
      email: "doantribinh@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "IT",
      job: "employee",
    },
    {
      id: 1882,
      namelogi: "kawaguchisatoshi",
      nameshow: "Kawaguchi Satoshi",
      email: "kawaguchisatoshi@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "IT",
      job: "employee",
    },
    {
      id: 2310,
      namelogin: "watanabe",
      nameshow: "Watanabe Yasuyuki",
      email: "Watanabeyasuyuki@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employee",
    },
    {
      id: 3000,
      namelogin: "yukichi",
      nameshow: "Yukichi Futaro",
      email: "yukichifutaro@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employee",
    },
    {
      id: 2610,
      namelogin: "momotaro",
      nameshow: "Momotaro Yamato",
      email: "momotaro@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employee",
    },
    {
      id: 2611,
      namelogin: "momotaro1",
      nameshow: "Momotaro Yamato",
      email: "momotaro@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employee",
    },
    {
      id: 5555,
      namelogin: "ontturekill",
      nameshow: "One Turn Kull",
      email: "otk@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "HR",
      job: "employee",
    },
    {
      id: 1412,
      namelogin: "kaitokid",
      nameshow: "Kaitou Kid",
      email: "kid@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "SP",
      job: "employee",
    },
    {
      id: 1877,
      namelogin: "linhthusinh",
      nameshow: "Phạm Tuấn Linh",
      email: "linhthusinh98@gmail.com",
      avatar: "https://ibb.co/30H11cQ",
      department: "IT",
      job: "employee",
    },
    {
      id: 4869,
      namelogin: "abeyukiko",
      nameshow: "阿部由紀子",
      email: "abeyukiko@gmail.com",
      avatar: "image",
      department: "SP",
      job: "employee",
    },
  ];

  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  const loginUserInfo = JSON.parse(decryptedAuth);
  const { namelogin } = loginUserInfo;

  const getUserNameById = (userId) => {
    const user = itemsData.find((item) => String(item.id) === String(userId));
    return user ? user.nameshow : "User Not Exist";
  };

  const userName = getUserNameById(userId);

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
              icon={userName.charAt(0)}
              color="orange"
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
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default MessengerComponent;
