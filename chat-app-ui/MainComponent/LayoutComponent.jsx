/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { Layout } from "antd";
import { DashboardComponent } from "./DashboardComponent";
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";
import { Outlet, useLocation } from "react-router-dom";
import image from "../src/assets/images/1.jpeg";
import { PieChartOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const itemsData = [
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
  id: 1878,
  name: "Phạm Tuấn Linh",
  avatar: "123",
  department: "IT",
  job: "employee",
};

export const ItemContext = createContext(null);
export const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ItemContext.Provider value={{ itemsData }}>
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
          <DashboardComponent loginUser={loginUser} />
        </Sider>
        <Layout>
          <HeaderComponent loginUser={loginUser} />
          <Outlet />
          <FooterComponent />
        </Layout>
      </Layout>
    </ItemContext.Provider>
  );
};
export default LayoutComponent;
