import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;
const InputComponent = () => (
  <>
    <Search placeholder="Nhập tin nhắn" enterButton={<SendOutlined />} size="large" />
  </>
);
export default InputComponent;