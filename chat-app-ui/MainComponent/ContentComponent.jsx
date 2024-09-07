import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { theme } from "antd";

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
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {userId}
        </div>
      </Content>
    </>
  );
};
