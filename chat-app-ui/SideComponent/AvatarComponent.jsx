import { Avatar, Space } from "antd";

// eslint-disable-next-line react/prop-types
const AvatarComponent = ({ color, icon, size, src, onClick }) => (
  <Space size={size} wrap>
    <Avatar
      onClick={onClick}
      style={{ backgroundColor: `${color}` }}
      icon={icon}
      src={src}
    />
  </Space>
);

// eslint-disable-next-line react/prop-types
export const SmallAvatarComponent = ({ color, icon, size, src }) => (
  <Avatar
    size={size}
    icon={icon}
    style={{ backgroundColor: `${color}`, marginTop: "10px"}}
    src={src}
  />
);
export default AvatarComponent;
