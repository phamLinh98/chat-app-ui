import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        title="This Link is Not Exits. Please back to Home Page"
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => navigate("/chat")}
          >
            Back To HomePage
          </Button>
        }
      />
    </>
  );
};

export default ErrorComponent;
