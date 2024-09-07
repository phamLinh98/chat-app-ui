import { Breadcrumb, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useParams } from "react-router-dom";

export const HeaderComponent = ({ userInfoHeader }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { userId } = useParams();

  // Find the user info based on userId
  const userInfo = userInfoHeader.find((user) => user.id === userId) || {};
  const name = userInfo.name; // Ví dụ: "Phạm Tuấn Linh"
  const firstLetter = name.charAt(0); // "P"
  
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
            <AvatarComponent
              icon={firstLetter}
              size={10}
              color={"orange"}
            />
            <p style={{ margin: "0 0 0 4px" }}>
              {userInfo.name || "No Name"} (đang hoạt động)
            </p>
          </div>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Header>
  );
};
