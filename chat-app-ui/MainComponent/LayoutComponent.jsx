import { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, theme } from "antd";
import { DashboardComponent } from "./DashboardComponent";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { Outlet } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import image from '../src/assets/images/1.jpeg';
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    label: "Nhắn tin",
    key: "1",
    icon: <PieChartOutlined />,
    children: [
      {
        info: [
          {
            id: "1877",
            name: "Phạm Tuấn Linh",
            avatar: image,
            department: "IT",
            job: "employee",
          },
          {
            id: "1878",
            name: "Izuka Namiho",
            avatar: image,
            department: "HR",
            job: "employee",
          },
          {
            id: "1879",
            name: "Tôn Ngộ Không",
            avatar: image,
            department: "HR",
            job: "employee",
          },
          {
            id: "1880",
            name: "Hàn Bảo Quân",
            avatar: image,
            department: "HR",
            job: "employee",
          },
          {
            id: "1881",
            name: "Doãn Trí Bình",
            avatar: image,
            department: "HR",
            job: "employee",
          },
          {
            id: "1882",
            name: "Kawaguchi Satoshi",
            avatar: image,
            content: "Hello Rin-san",
            time: 1111,
          },
        ],
        chat: [
          {
            user: ["Phạm Tuấn Linh", "Izuka Namiho"],
            contents: [
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 1111,
              },
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 2222,
              },
              {
                id: "1878",
                name: "Izuka Namiho",
                avatar: image,
                content: "Hello Rin-san",
                time: 1111,
              },
            ],
          },
          {
            user: ["Phạm Tuấn Linh", "Hàn Bảo Quân"],
            contents: [
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 1111,
              },
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 2222,
              },
              {
                id: "1880",
                name: "Hàn Bảo Quân",
                avatar: image,
                content: "Hello Rin-san",
                time: 1111,
              },
            ],
          },
          {
            user: ["Tôn Ngộ Không", "Izuka Namiho"],
            contents: [
              {
                id: "1879",
                name: "Tôn Ngộ Không",
                avatar: image,
                content: "Hello Izuka",
                time: 1111,
              },
              {
                id: "1879",
                name: "Tôn Ngộ Không",
                avatar: image,
                content: "Hello Izuka",
                time: 2222,
              },
              {
                id: "1878",
                name: "Izuka Namiho",
                avatar: image,
                content: "Hello Rin-san",
                time: 1111,
              },
            ],
          },
          {
            user: ["Tôn Ngộ Không", "Doãn Trí Bình"],
            contents: [
              {
                id: "1879",
                name: "Tôn Ngộ Không",
                avatar: image,
                content: "Hello Izuka",
                time: 1111,
              },
              {
                id: "1879",
                name: "Tôn Ngộ Không",
                avatar: image,
                content: "Hello Izuka",
                time: 2222,
              },
              {
                id: "1881",
                name: "Doãn Trí Bình",
                avatar: image,
                content: "Hello Rin-san",
                time: 1111,
              },
            ],
          },
          {
            user: ["Phạm Tuấn Linh", "Doãn Trí Bình"],
            contents: [
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 1111,
              },
              {
                id: "1877",
                name: "Phạm Tuấn Lin",
                avatar: image,
                content: "Hello Izuka",
                time: 2222,
              },
              {
                id: "1881",
                name: "Doãn Trí Bình",
                avatar: image,
                content: "Hello Rin-san",
                time: 1111,
              },
            ],
          },
          {
            user: ["Phạm Tuấn Linh", "Kawaguchi Satoshi"],
            contents: [
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 1111,
              },
              {
                id: "1877",
                name: "Phạm Tuấn Linh",
                avatar: image,
                content: "Hello Izuka",
                time: 2222,
              },
              {
                id: "1882",
                name: "Kawaguchi Satoshi",
                avatar: image,
                content: "Hello Rin-san",
                time: 1111,
              },
            ],
          },
        ],
        group: {},
      },
    ],
  },
];

const loginUser = {
  id: 1877,
  name: "Phạm Tuấn Linh",
  avatar: "123",
  department: "IT",
  job: "employee",
};

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { info, chat } = items[0].children[0];
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
  console.log("userInfoListAfterFlat :>> ", userInfoListAfterFlat);

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
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Linh Thu Sinh Made
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
