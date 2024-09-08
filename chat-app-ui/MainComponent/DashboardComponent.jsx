/* eslint-disable react/prop-types */
import { Menu } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import AvatarComponent from "../SideComponent/AvatarComponent";
import { useNavigate, useParams } from "react-router-dom";

export const DashboardComponent = ({ chattingUsers }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
        selectedKeys={[userId]}
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
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "4px",
            }}
            onClick={() => navigate(`/chat/${user.id}`)} // Điều hướng đến route tương ứng với ID
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AvatarComponent
                icon={`${user.name.charAt(0)}`}
                size={10}
                color="orange"
              />
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
