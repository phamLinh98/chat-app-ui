import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { theme } from "antd";
import MessengerComponent from "./MessengerComponent";
import { useContext } from "react";
import { ItemContext } from "../SideComponent/LayoutConfigComponent";

export const ContentComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { userId } = useParams();
  const data = useContext(ItemContext);
  console.log('data :>> ', data)

  return (
    <>
      <Content
        style={{
          margin: "20px 16px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {userId ? (
            <MessengerComponent/>
          ) : (
            <p style={{ margin: "0 0 0 4px" }}>
              <b>Hãy bắt đầu tin nhắn mới.</b>
            </p>
          )}
        </div>
      </Content>
    </>
  );
};
