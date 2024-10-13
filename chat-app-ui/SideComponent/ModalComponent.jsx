/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button, Space, Input } from "antd";
import TableUserComponent from "./TableUserComponent"; // Giả sử bạn đã import component này
import TextArea from "antd/es/input/TextArea";

const ModalComponent = ({ open, onClose }) => {
  const [showInputs, setShowInputs] = useState(false); // Trạng thái để theo dõi nội dung modal

  const handleNext = () => {
    setShowInputs(true); // Chuyển sang trạng thái hiển thị input
  };

  const handleCancel = () => {
    onClose();
    setShowInputs(false); // Đặt lại trạng thái khi đóng modal
  };

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
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          ),
        ]}
      >
        {showInputs ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Input placeholder="Basic usage" />
            <TextArea rows={4} />
          </div>
        ) : (
          <TableUserComponent />
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
