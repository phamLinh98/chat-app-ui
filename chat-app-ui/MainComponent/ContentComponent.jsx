import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { theme } from "antd";
import MessengerComponent from "./MessengerComponent";

export const ContentComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { userId } = useParams();
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
            minHeight: 840,
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
