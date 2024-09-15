import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const SpinComponent = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 200,
          }}
          spin
        />
      }
    />
  </div>
);

export default SpinComponent;
