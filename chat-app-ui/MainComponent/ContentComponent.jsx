import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { theme } from "antd";
import "../src/content.css";
import MessengerComponent from "./MessengerComponent";

export const ContentComponent = () => {
  const {
    token: { borderRadiusLG },
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
            minHeight: "650px",
            backgroundImage: `url('https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/123.jpg')`, 
            backgroundSize: "cover", // Optional: to cover the entire div
            backgroundPosition: "center", // Optional: to center the image
            borderRadius: borderRadiusLG,
          }}
        >
          {userId ? (
            <div
              className="messenger-scroll"
              style={{
                maxHeight: "700px", // Set a max height for the messenger area
                overflowY: "auto", // Enable scrolling if content overflows
                paddingRight: "10px", // To avoid content touching the scrollbar
              }}
            >
              <MessengerComponent />
            </div>
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
