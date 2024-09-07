import { Avatar, Space } from "antd";

// eslint-disable-next-line react/prop-types
const AvatarComponent = ({ color, icon, src, size, onClick }) => (
  <Space size={size} wrap>
    <Avatar onClick={onClick} style={{ backgroundColor: `${color}` }} icon={icon} src={src} />
  </Space>
);

// eslint-disable-next-line react/prop-types
export const SmallAvatarComponent = ({ color, icon, src, size }) => (
  <Avatar size={size} icon={icon} style={{ backgroundColor: `${color}` }} src={src} />
);
export default AvatarComponent;
