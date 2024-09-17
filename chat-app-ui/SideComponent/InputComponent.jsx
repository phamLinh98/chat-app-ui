import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { Search } = Input;
// eslint-disable-next-line react/prop-types
const InputComponent = ({ placeholder }) => (
  <>
    <Search
      placeholder={placeholder}
      enterButton={<SendOutlined />}
      size="large"
    />
  </>
);
export default InputComponent;
