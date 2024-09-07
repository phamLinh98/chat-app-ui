import { Menu, Avatar } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useNavigate } from "react-router-dom";

export const DashboardComponent = ({ chattingUsers }) => {

  const navigate = useNavigate();
  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
      >
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          style={{ alignItems: "center" }}
        >
          Nhắn Tin
        </Menu.Item>
        {chattingUsers.map((user) => (
          <Menu.Item
            key={user.id} // Sử dụng ID người dùng làm key
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => navigate(`/chat/${user.id}`)} // Điều hướng đến route tương ứng với ID
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AvatarComponent icon={`${user.name.charAt(0)}`} size={10} color="orange" />
              <p
                style={{
                  marginLeft: "11px",
                  marginRight: "5px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "120px",
                }}
              >
                {user.name}
              </p>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};
