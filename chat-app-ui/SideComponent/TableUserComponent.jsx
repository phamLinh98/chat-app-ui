import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
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

const TableUserComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
  }, []); // Chỉ chạy một lần khi component mount

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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      selectedRowKeys={selectedRowKeys}
    />
  );
};
export default TableUserComponent;
