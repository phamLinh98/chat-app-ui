/* eslint-disable react/prop-types */
import { Menu } from "antd";
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

  //Dữ liệu truyền xuống từ ItemContext xuống các component con
  const dataGetFromItemContext = useContext(ItemContext);

  // Lấy thông tin login user đăng nhập từ ItemContext
  const userLoginSuccessName =
    dataGetFromItemContext.userLoginSuccess.namelogin;
  const userLoginSuccessAvatar = dataGetFromItemContext.userLoginSuccess.avatar;

  //Lấy toàn bộ nội dung các cuộc trò chuyện hiện tại trong hệ thống
  const allChatContentsNow = dataGetFromItemContext.dataChat;

  //Lấy toàn bộ thông tin của toàn bộ user trong hệ thống
  const getDataUserInfoChatWithLoginUser = dataGetFromItemContext.dataDashboard;

  // Lấy tên hiển thị của User thông qua tên đăng nhập của họ
  const getNameShowFromNameLogin = (namelogin) => {
    const nameShow = getDataUserInfoChatWithLoginUser.find(
      (item) => item.namelogin === namelogin
    );
    return nameShow ? nameShow.nameshow : "null";
  };

  // Từ toàn bộ các cuộc trò chuyện, lọc ra những cuộc trò chuyện chỉ của login user với những user khác
  const chatContentOfLoginUserWithOther = allChatContentsNow.filter(
    (conversation) => conversation.user.includes(loginUser.namelogin)
  );

  // Lấy thông tin user phục vụ mục đích hiển thị lên dashboard (user nameshow và avatar)
  const userInfoRenderToDashboard = chatContentOfLoginUserWithOther.flatMap(
    (conversation) => {
      const userInfo = conversation.contents.find(
        (content) => content.name !== loginUser.namelogin
      );

      if (userInfo) {
        return {
          userId: userInfo.userIdSending, // userId để phục vụ router chuyển trang
          name: getNameShowFromNameLogin(userInfo.name),
          avatar: userInfo.avatar,
          namelogin: userInfo.name,
        };
      }
      return [];
    }
  );

  //LOGOUT in Dashboard
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
        selectedKeys={[userId]} // cái này để chỉ rõ menu nào đang được chọn , hover ko lq route
      >
        <SubMenu
          key="sub1"
          icon={<MessageOutlined />}
          title="Messenger"
          style={{ alignItems: "center" }}
        >
          {userInfoRenderToDashboard.map((user) => (
            <Menu.Item
              key={user.userId} // Sử dụng ID người dùng làm key
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "4px",
                paddingLeft: "25px",
              }}
              onClick={() => navigate(`/chat/${user.userId}`)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <AvatarComponent
                  icon={`${user.name.charAt(0)}`}
                  size={10}
                  color="orange"
                  src={user.avatar}
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
              src={userLoginSuccessAvatar}
              icon={getNameShowFromNameLogin(userLoginSuccessName).charAt(0)}
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
              {getNameShowFromNameLogin(userLoginSuccessName)}
            </p>
          }
          style={{ alignItems: "center" }}
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
