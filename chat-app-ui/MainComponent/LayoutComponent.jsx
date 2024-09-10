/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Layout } from "antd";
import { DashboardComponent } from "./DashboardComponent";
import { HeaderComponent } from "./HeaderComponent";
import {
  ItemContext,
  LayoutConfigComponent,
} from "../SideComponent/LayoutConfigComponent";
import { FooterComponent } from "./FooterComponent";
import { Outlet } from "react-router-dom";
const { Sider } = Layout;

const loginUser = {
  id: 1878,
  name: "Phạm Tuấn Linh",
  avatar: "123",
  department: "IT",
  job: "employee",
};

export const LayoutComponent = () => {
  return (
    <>
      <LayoutConfigComponent>
        <LayoutComponentPassing />
      </LayoutConfigComponent>
    </>
  );
};

export const LayoutComponentPassing = () => {
  const [collapsed, setCollapsed] = useState(false);
  const data = useContext(ItemContext);
  const { itemsData } = data;
  const { info, chat } = itemsData[0].children[0];
  // Tạo danh sách người dùng đang trò chuyện và lấy ID của họ
  const currentChats = chat.filter((conversation) =>
    conversation.user.includes(loginUser.name)
  );

  const userInfoListAfterFlat = currentChats.flatMap((conversation) => {
    return conversation.user
      .filter((name) => name !== loginUser.name) // Loại bỏ người dùng hiện tại
      .map((otherUserName) => {
        const userInfo = info.find((user) => user.name === otherUserName);
        return {
          name: otherUserName,
          avatar: userInfo?.avatar || "default-avatar",
          id: userInfo?.id,
        };
      });
  });

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <DashboardComponent chattingUsers={userInfoListAfterFlat} />
      </Sider>
      <Layout>
        <HeaderComponent userInfoHeader={userInfoListAfterFlat} />
        <Outlet />
        <FooterComponent />
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
