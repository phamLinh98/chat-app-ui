/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Button, Space, Input, Table, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { get } from "../utils/api";

const columns = [
  {
    title: (
      <Tag color="volcano" style={{ fontSize: "15px" }}>
        Name
      </Tag>
    ),
    dataIndex: "nameshow",
  },
  {
    title: (
      <Tag color="green" style={{ fontSize: "15px" }}>
        Department
      </Tag>
    ),
    dataIndex: "department",
  },
  {
    title: (
      <Tag color="purple" style={{ fontSize: "15px" }}>
        Job
      </Tag>
    ),
    dataIndex: "employeer",
  },
];

const ModalComponent = ({ open, onClose }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUserKeys, setSelectedUserKeys] = useState([]); // State to store selected keys for the input

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleNext = () => {
    setShowInputs(true);
    setSelectedUserKeys(selectedRowKeys); // Store the selected keys when transitioning to the input view
  };

  const handleCancel = () => {
    onClose();
    setShowInputs(false);
    setSelectedRowKeys([]);
    setSelectedUserKeys([]);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataFromInfoTable = async () => {
      try {
        const response = await get("/api/info");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromInfoTable();
  }, []);

  // Kiểm tra nếu data là null hoặc undefined trước khi sử dụng
  if (!data) {
    return <div>Loading...</div>;
  }

  const dataSource = data.map((item) => ({
    key: item.id,
    nameshow: item.nameshow,
    department: item.department,
    employeer: item.job,
  }));

  return (
    <>
      <Space>
        <Button type="primary" onClick={onClose}>
          Open Modal
        </Button>
      </Space>
      <Modal
        open={open}
        title="Mời chọn user để bắt đầu"
        onCancel={handleCancel}
        footer={[
          showInputs ? (
            <>
              <Button type="primary" onClick={onClose}>
                Gửi
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <Button
              type="primary"
              onClick={handleNext}
              disabled={selectedRowKeys.length !== 1} // Disable if selectedRowKeys.length is not 1
            >
              Next
            </Button>
          ),
        ]}
      >
        {showInputs ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Input
              placeholder="Người dùng đang được chọn"
              value={selectedUserKeys.join(", ")} // Use the stored keys for the Input value
            />
            <TextArea rows={4} placeholder="Nhập nội dung gửi" />
          </div>
        ) : (
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }} // Set pagination to show a maximum of 5 records
          />
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
