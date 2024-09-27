import { useState } from "react";
import { Avatar, Input, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
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
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Employeer Code"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="User Name"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Email"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Department"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Position"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Login Name"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Password"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
                <Space.Compact>
                  <Input
                    style={{ width: "50%", textAlign: "center" }}
                    defaultValue="Re-Password"
                  />
                  <Input
                    style={{ width: "50%" }}
                    placeholder="Nhập thông tin..."
                  />
                </Space.Compact>
              </Space>
            </div>

            <div style={{ marginLeft: "20px", marginTop: "65px" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <Avatar
                  size={200}
                  src={
                    "https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/demo.jpg"
                  }
                  shape="square"
                  style={{ border: "1px dashed black" }}
                />
                <b style={{ textAlign: "center" }}>Choose Avatar</b>
                <div
                  style={{ display: "flex", gap: "5px", marginLeft: "30px" }}
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
