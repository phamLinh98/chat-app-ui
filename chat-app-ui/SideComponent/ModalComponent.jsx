/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Input, Table, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { get, getChatDoubleUser, postChatData } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { getDataFromLocalStorage } from "../utils/getDataFromLocalStorage";
import { SortedContentsContext } from "../MainComponent/SortedContentsContext";
import { useGetUserFromDashboard } from "../MainComponent/GetUserFromDashboard";
import { findChatIndex } from "../utils/findIndexUser";
import { findUserNameViaChatDataAndSendingId } from "../utils/findNameLoginViaChatDataAndSendingId";
//import { getNameLoginFromId } from './../utils/findNameLoginViaId';

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
  // const navigate = useNavigate();
  const { userId } = useParams();
  const { userClickNow, namelogin, avatar } = useGetUserFromDashboard(userId); // custom Hook get user info clicked
  const [content, setContent] = useState("");
  const { id } = getDataFromLocalStorage();

  const { indexfind, setContextUserLoginAndUserClicked, setIndex } = useContext(
    SortedContentsContext
  );
  const navigate = useNavigate();

  const [chatDataFromTableChat, setChatDataFromTableChat] = useState(null);

  useEffect(() => {
    const fetchDataChat = async () => {
      const responseDataChat = await get("/api/chat");
      const data = await responseDataChat.json();
      setChatDataFromTableChat(data);
    };
    fetchDataChat();
  }, []);

  useEffect(() => {
    const fetchDataChat = async () => {
      // Kiểm tra xem namelogin và userClickNow.namelogin có hợp lệ hay không
      if (namelogin && userClickNow?.namelogin) {
        const responseDataChat = await getChatDoubleUser(
          "/api/get-chat-double-user",
          namelogin,
          userClickNow.namelogin
        );

        if (responseDataChat) {
          const data = await responseDataChat.json();
          setContextUserLoginAndUserClicked(data);
        } else {
          console.error("Failed to fetch chat data.");
        }
      } else {
        console.error("Invalid login details.");
      }
    };

    fetchDataChat();
  }, [namelogin, setContextUserLoginAndUserClicked, userClickNow.namelogin]);

  const nameNow = findUserNameViaChatDataAndSendingId(
    chatDataFromTableChat,
    String(selectedUserKeys)
  );

  const chatIndex = findChatIndex(chatDataFromTableChat, namelogin, nameNow);

  useEffect(() => {
    if (chatIndex) {
      setIndex(chatIndex);
    }
  }, [chatIndex, setIndex]);

  let autoIncrementKey = 0;

  const handleSubmit = async () => {
    if (!content.trim()) return;
    //const userClick = await getNameLoginFromId(selectedUserKeys);
    //console.log(selectedUserKeys);
    const newData = {
      id: indexfind,
      userIdSending: id,
      avatar: avatar,
      name: namelogin,
      key: autoIncrementKey + 1,
      content: content,
      // userClick:userClick,
      // userIdSendingOther:selectedRowKeys[0]
    };
    try {
      const { updatedContents = null } = await postChatData(
        "/api/add-chat",
        newData
      );
      // Kiểm tra xem response có đúng định dạng không
      if (updatedContents) {
        // Hoặc điều kiện kiểm tra khác
        setContextUserLoginAndUserClicked({ contents: updatedContents });
        setContent("");
      } else {
        console.error("Invalid response format", updatedContents);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
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

  const listDataWithOutLoginUser = dataSource.filter((item) => item.key !== id);

  const navigateAfterAddSuccess = () => {
    onClose();
    handleSubmit();
    setTimeout(() => {
      navigate(`chat/${selectedRowKeys}`);
    }, 1000); // Chờ 1 giây (1000 ms)
  };

  return (
    <>
      <Modal
        open={open}
        title="Mời chọn user để bắt đầu"
        onCancel={handleCancel}
        footer={[
          showInputs ? (
            <>
              <Button type="primary" onClick={navigateAfterAddSuccess}>
                Gửi
              </Button>
              <Button onClick={() => setShowInputs((pre) => !pre)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={handleNext}
                disabled={selectedRowKeys.length !== 1} // Disable if selectedRowKeys.length is not 1
              >
                Next
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
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
            <TextArea
              rows={4}
              placeholder="Nhập nội dung gửi"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Ngăn Enter thêm dòng mới
                  navigateAfterAddSuccess(); // Gửi nội dung
                }
              }}
            />
          </div>
        ) : (
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            columns={columns}
            dataSource={listDataWithOutLoginUser}
            pagination={{ pageSize: 5 }} // Set pagination to show a maximum of 5 records
          />
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
