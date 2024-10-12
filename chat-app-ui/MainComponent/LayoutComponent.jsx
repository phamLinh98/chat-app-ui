/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { DashboardComponent } from "./DashboardComponent";
import { HeaderComponent } from "./HeaderComponent";
import { Outlet } from "react-router-dom";
import CryptoJS from "crypto-js";
import SpinComponent from "../SideComponent/SpinComponent";
import { SortedContentsProvider } from "./SortedContentsContext";
import { get, getDataFollowNameLogin } from "../utils/api";
import { FooterComponent } from "./FooterComponent";
const { Sider } = Layout;
const secretKey = import.meta.env.VITE_DOMAIN;

export const ItemContext = createContext(null);
export const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const encryptedAuth = localStorage.getItem("userData");
  const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, secretKey).toString(
    CryptoJS.enc.Utf8
  );

  const userLoginSuccess = JSON.parse(decryptedAuth);

  const [dataDashboard, setDataDashboard] = useState(null);
  const [dataChat, setDataChat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDashboard = await get("/api/info");
        const data = await responseDashboard.json();
        setDataDashboard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseChat = await getDataFollowNameLogin(
          "/api/chat-follow-namelogin"
        );
        const data = await responseChat.json();
        setDataChat(data);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    fetchData();
  }, []);

  if (!dataDashboard || !dataChat)
    return (
      <div>
        <SpinComponent />
      </div>
    );

  return (
    <ItemContext.Provider value={{ userLoginSuccess, dataDashboard, dataChat }}>
      <SortedContentsProvider>
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
      </SortedContentsProvider>
    </ItemContext.Provider>
  );
};
export default LayoutComponent;
