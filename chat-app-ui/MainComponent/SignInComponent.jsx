import { useState } from "react";
import { Avatar, Input, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { GrStatusGood } from "react-icons/gr";
// import { UserOutlined } from "@ant-design/icons";
export const SiginInComponent = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    navigate("/login");
  };
  return (
    <>
      <Modal
        open={open}
        title="Tạo tài khoản mới"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <OkBtn />
            <CancelBtn />
          </>
        )}
      >
        <Space
          wrap
          size={32}
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Space direction="vertical" size="middle">
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Employeer Code"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <PiWarningCircleBold style={{ color: "red" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="User Name"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Email"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Department"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Position"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Login Name"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Password"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{
                      width: "50%",
                      textAlign: "center",
                      backgroundColor: "#E6F4FF",
                      color: "black",
                    }}
                    defaultValue="Re-Password"
                    disabled
                  />
                  <Input
                    style={{ width: "50%", marginRight: "5px" }}
                    placeholder="Nhập thông tin..."
                  />
                  <div style={{ marginTop: "5px" }}>
                    <GrStatusGood style={{ color: "green" }} />
                  </div>
                </Space.Compact>
              </Space>
            </div>

            <div style={{ marginLeft: "20px", marginTop: "65px" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <Avatar
                  size={150}
                  src={
                    "https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/demo.jpg"
                  }
                  shape="square"
                  style={{ border: "1px dashed black" }}
                />
                <b style={{ textAlign: "center" }}>Choose Avatar</b>
                <div
                  style={{ display: "flex", gap: "5px", marginLeft: "15px" }}
                >
                  <Avatar
                    size="large"
                    src={
                      "https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/demo2.jpg"
                    }
                    shape="square"
                    style={{ border: "1px dashed black" }}
                  />
                  <Avatar
                    size="large"
                    src={
                      "https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/demo3.jpg"
                    }
                    shape="square"
                    style={{ border: "1px dashed black" }}
                  />
                  <Avatar
                    size="large"
                    src={
                      "https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/demo.jpg"
                    }
                    shape="square"
                    style={{ border: "1px dashed black" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Space>
      </Modal>
    </>
  );
};
