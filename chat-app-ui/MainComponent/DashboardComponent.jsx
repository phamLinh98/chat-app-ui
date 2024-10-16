/* eslint-disable react/prop-types */
import { Menu } from "antd";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useNavigate, useParams } from "react-router-dom";
import {
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { ItemContext } from "./LayoutComponent";
import { LiaFacebookMessenger } from "react-icons/lia";
import { FaList } from "react-icons/fa";
import { SortedContentsContext } from "./SortedContentsContext";

export const DashboardComponent = ({ loginUser }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const dataGetFromItemContext = useContext(ItemContext);
  const userLoginSuccessName =
    dataGetFromItemContext.userLoginSuccess.namelogin;
  const userLoginSuccessAvatar = dataGetFromItemContext.userLoginSuccess.avatar;
  const allChatContentsNow = dataGetFromItemContext.dataChat;
  const getDataUserInfoChatWithLoginUser = dataGetFromItemContext.dataDashboard;

  const getNameShowFromNameLogin = (namelogin) => {
    const nameShow = getDataUserInfoChatWithLoginUser.find(
      (item) => item.namelogin === namelogin
    );
    return nameShow ? nameShow.nameshow : "null";
  };

  const chatContentOfLoginUserWithOther = allChatContentsNow.filter(
    (conversation) => conversation.user.includes(loginUser.namelogin)
  );

  const userInfoRenderToDashboard = chatContentOfLoginUserWithOther.flatMap(
    (conversation) => {
      const userInfo = conversation.contents.find(
        (content) => content.name !== loginUser.namelogin
      );

      if (userInfo) {
        return {
          userId: userInfo.userIdSending,
          name: getNameShowFromNameLogin(userInfo.name),
          avatar: userInfo.avatar,
          namelogin: userInfo.name,
        };
      }
      return [];
    }
  );

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

  const { openModal } = useContext(SortedContentsContext);

  const menuItems = [
    {
      key: "newMessage",
      label: "New Message",
      icon: <LiaFacebookMessenger style={{ fontSize: "20px" }} />,
      onClick: openModal,
      style: {
        backgroundColor: "#FFA500",
        color: "#ffffff",
      },
    },
    {
      key: "listMessages",
      label: "List Messages",
      icon: <FaList />,
      children: userInfoRenderToDashboard.map((user) => ({
        key: user.userId,
        label: (
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
        ),
        style: {
          paddingLeft: "25px"
        },
        onClick: () => navigate(`/chat/${user.userId}`),
      })),
    },
    {
      key: "userMenu",
      label: (
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
      ),
      icon: (
        <AvatarComponent
          src={userLoginSuccessAvatar}
          icon={getNameShowFromNameLogin(userLoginSuccessName).charAt(0)}
          color="red"
        />
      ),
      children: [
        {
          key: "friends",
          label: "Bạn Bè",
          icon: <UserAddOutlined />,
        },
        {
          key: "settings",
          label: "Cài đặt",
          icon: <SettingOutlined />,
        },
        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
          onClick: solveLogout,
        },
      ],
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      selectedKeys={[userId]}
      items={menuItems}
    />
  );
};
