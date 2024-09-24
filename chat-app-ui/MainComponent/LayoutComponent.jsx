/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { Layout } from "antd";
import { DashboardComponent } from "./DashboardComponent";
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";
import { Outlet } from "react-router-dom";
import CryptoJS from "crypto-js";
import useSWR from "swr";
import { get, getDataFollowNameLogin } from "../utils/api";
import SpinComponent from "../SideComponent/SpinComponent";
const { Sider } = Layout;
const secretKey = import.meta.env.VITE_DOMAIN;

const fetcherDashboard = (url) => get(url).then((res) => res.json());
const fetcherChatNameLogin = (url) => getDataFollowNameLogin(url).then((res) => res.json());

export const ItemContext = createContext(null);
export const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );

  const userLoginSuccess = JSON.parse(decryptedAuth);

  const { data: dataDashboard } = useSWR("/api/info", fetcherDashboard);
  const { data: dataChat} = useSWR("/api/chat-follow-namelogin", fetcherChatNameLogin);

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
