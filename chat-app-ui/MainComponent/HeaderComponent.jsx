/* eslint-disable react/prop-types */
import { Breadcrumb, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ItemContext } from "../SideComponent/LayoutConfigComponent";

export const HeaderComponent = ({ userInfoHeader }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { userId } = useParams();

  // Hàm tìm user theo id
  const getUserNameById = (userId) => {
    const user = userInfoHeader.find((user) => user.id === userId);
    return user ? user.name : null;
  };

  // Tìm tên user dựa trên userId
  const userNameFullName = getUserNameById(userId);
  const style = {
    width: "10px",
    height: "10px",
    backgroundColor: "#4caf50",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "5px",
  };

  const data = useContext(ItemContext);
  console.log("data :>> ", data);

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
      >
        <Breadcrumb.Item>
          <div style={{ display: "flex", alignItems: "center" }}>
            {userNameFullName ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <AvatarComponent
                    icon={userNameFullName.charAt(0)}
                    size={10}
                    color={"orange"}
                  />
                  <p style={{ margin: "0 3px 0 4px" }}>
                    <b>{userNameFullName || "No Name"}</b>
                    <div style={style}></div>
                  </p>
                </div>
              </>
            ) : (
              <p style={{ margin: "0 0 0 4px" }}>
                {userId !== undefined ? (
                  <b>Không tìm thấy tin nhắn người dùng có mã : {userId}</b>
                ) : (
                  <h3 style={{ marginBottom: "4px" }}>
                    Chào mừng bạn , Hãy bắt đầu nhắn tin với bạn bè nào
                  </h3>
                )}
              </p>
            )}
          </div>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Header>
  );
};
