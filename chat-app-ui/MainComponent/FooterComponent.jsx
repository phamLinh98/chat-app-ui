import { Footer } from "antd/es/layout/layout";
import InputComponent from "../SideComponent/InputComponent";
import { useParams } from "react-router-dom";
import AvatarComponent from "../SideComponent/AvatarComponent";

export const FooterComponent = () => {
  const { userId } = useParams();
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      {userId !== undefined ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <AvatarComponent color="red" icon="T" size="14" />
          <InputComponent />
        </div>
      ) : (
        ""
      )}
    </Footer>
  );
};
