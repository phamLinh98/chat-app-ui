/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { Layout } from "antd";
import { DashboardComponent } from "./DashboardComponent";
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";
import { Outlet } from "react-router-dom";
import image from "../src/assets/images/1.jpeg";
import CryptoJS from "crypto-js";
import useSWR from "swr";
import { get } from "../utils/api";
import SpinComponent from "../SideComponent/SpinComponent";
const { Sider } = Layout;
const secretKey = import.meta.env.VITE_DOMAIN;

const fetcherDashboard = (url) => get(url).then((res) => res.json());

const fetcherChat = (url) => get(url).then((res) => res.json());

export const ItemContext = createContext(null);
export const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );

  const userLoginSuccess = JSON.parse(decryptedAuth);

  const { data: dataDashboard } = useSWR("/info", fetcherDashboard);
  const { data: dataChat } = useSWR("/chat", fetcherChat);
  if (!dataDashboard || !dataChat)
    return (
      <div>
        <SpinComponent />
      </div>
    );

  return (
    <ItemContext.Provider value={{ userLoginSuccess, dataDashboard, dataChat }}>
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
          <DashboardComponent loginUser={userLoginSuccess} />
        </Sider>
        <Layout>
          <HeaderComponent loginUser={userLoginSuccess} />
          <Outlet />
          <FooterComponent />
        </Layout>
      </Layout>
    </ItemContext.Provider>
  );
};
export default LayoutComponent;
