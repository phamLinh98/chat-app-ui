/* eslint-disable react/prop-types */
import { Menu } from "antd";
import anh123 from "../public/image/1.jpeg";
import anh222 from "../public/image/6.jpeg";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useNavigate, useParams } from "react-router-dom";
import {
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { useContext } from "react";
import { ItemContext } from "./LayoutComponent";

export const DashboardComponent = ({ loginUser }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const data = useContext(ItemContext);

  const userLoginSuccess = data.userLoginSuccess.name;
  const dataDashboard = data.dataDashboard;
  const dataChat = data.dataChat;

  const currentChats = dataChat.filter((conversation) =>
    conversation.user.includes(loginUser.name)
  );

  const userInfoListAfterFlat = currentChats.flatMap((conversation) => {
    return conversation.user
      .filter((name) => name !== loginUser.name)
      .map((otherUserName) => {
        const userInfo = dataDashboard.find(
          (user) => user.nameshow === otherUserName
        );
        return {
          name: otherUserName,
          avatar: userInfo?.avatar || "default-avatar",
          id: userInfo?.id,
        };
      });
  });

  const solveLogout = () => {
    const confirmed = confirm("Bạn chắc chắn muốn đăng xuất không?");

    if (confirmed) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      navigate("/login");
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
        selectedKeys={[userId]}
      >
        <SubMenu
          key="sub1"
          icon={<MessageOutlined />}
          title="Messenger"
          style={{ alignItems: "center" }}
        >
          {userInfoListAfterFlat.map((user) => (
            <Menu.Item
              key={user.id} // Sử dụng ID người dùng làm key
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "4px",
                paddingLeft: "25px",
              }}
              onClick={() => navigate(`/chat/${user.id}`)} // Điều hướng đến route tương ứng với ID
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <AvatarComponent
                  icon={`${user.name.charAt(0)}`}
                  size={10}
                  color="orange"
                  // src={user.avatar}
                  src={anh123}
                />
                <p
                  style={{
                    marginLeft: "11px",
                    marginRight: "5px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "120px",
                  }}
                >
                  {user.name}
                </p>
              </div>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <Menu theme="dark" key={"1"} mode="inline">
        <SubMenu
          key="sub1"
          icon={
            <AvatarComponent
              src={anh222}
              icon={userLoginSuccess.charAt(0)}
              color="red"
            />
          }
          title={
            <p
              style={{
                marginLeft: "11px",
                marginRight: "5px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "120px",
              }}
            >
              {userLoginSuccess}
            </p>
          }
          style={{ alignItems: "center" }}
          src={anh123}
        >
          <Menu.Item
            key="1"
            icon={<UserAddOutlined />}
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "4px",
              paddingLeft: "35px",
            }}
          >
            Bạn Bè
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<SettingOutlined />}
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "4px",
              paddingLeft: "35px",
            }}
          >
            Cài đặt
          </Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined />}
            onClick={() => solveLogout()}
            key="3"
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "4px",
              paddingLeft: "35px",
            }}
          >
            Đăng xuất
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};
