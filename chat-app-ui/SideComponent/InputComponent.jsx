import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { Search } = Input;
// eslint-disable-next-line react/prop-types
const InputComponent = ({ placeholder, handlePlaceholder }) => (
  <>
    <Search
      placeholder={handlePlaceholder(placeholder)}
      enterButton={<SendOutlined />}
      size="large"
    />
  </>
);
export default InputComponent;
