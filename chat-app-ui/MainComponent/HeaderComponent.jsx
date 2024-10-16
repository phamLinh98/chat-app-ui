/* eslint-disable react/prop-types */
import { Breadcrumb, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useParams } from "react-router-dom";
import { ItemContext } from "./LayoutComponent";
import { useContext } from "react";

export const HeaderComponent = ({ loginUser }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Lấy userId từ Route
  const { userId } = useParams();
  const data = useContext(ItemContext);
  const getDataFromUserList = data.dataDashboard;
  const dataChat = data.dataChat;
  const userLoginName = data.userLoginSuccess.name;

  const getNameShowFromNameLogin = (namelogin) => {
    const nameShow = getDataFromUserList.find(
      (item) => item.namelogin === namelogin
    );
    return nameShow ? nameShow.nameshow : "null";
  };
  const currentChats = dataChat.filter((conversation) =>
    conversation.user.includes(loginUser.namelogin)
  );
  const userInfoListAfterFlat = currentChats.flatMap((conversation) => {
    const otherUser = conversation.contents.find(
      (content) => content.name !== loginUser.namelogin
    );
    if (otherUser) {
      return {
        userId: otherUser.userIdSending,
        name: getNameShowFromNameLogin(otherUser.name),
        avatar: otherUser.avatar,
      };
    }
    return [];
  });
  // Hàm tìm user theo id
  const getUserNameById = (userId) => {
    const user = userInfoListAfterFlat.find(
      (user) => String(user.userId) === String(userId)
    );
    return user ? { name: user.name, avatar: user.avatar } : "";
  };
  // Tìm tên user dựa trên userId
  const { name, avatar } = getUserNameById(userId);
  const style = {
    width: "10px",
    height: "10px",
    backgroundColor: "#4caf50",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "5px",
  };

  // Create breadcrumb items based on the user information
  const breadcrumbItems = [
    {
      key: "home",
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          {name ? (
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <AvatarComponent
                icon={name.charAt(0)}
                size={10}
                color={"orange"}
                src={avatar}
              />
              <span style={{ margin: "0 3px 0 4px" }}>
                <b>{name || "No Name"}</b>
                <div style={style}></div>
              </span>
            </div>
          ) : (
            <span style={{ margin: "0 0 0 4px" }}>
              {userId !== undefined ? (
                <b>
                  Trong list Messenger người dùng : {userId} không tồn tại
                </b>
              ) : (
                <h3 style={{ marginBottom: "4px" }}>
                  Hôm nay bạn thế nào {userLoginName} ?
                </h3>
              )}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Header
      style={{
        padding: "0 20px",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Breadcrumb
        style={{
          margin: "20px 0 0 18px",
        }}
        items={breadcrumbItems} // Use items array here
      />
    </Header>
  );
};
