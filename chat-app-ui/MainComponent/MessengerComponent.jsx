import { Col, Divider, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import {
  AliwangwangOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import image from "../src/assets/images/1.jpeg";
import { PieChartOutlined } from "@ant-design/icons";

const MessengerComponent = () => {
  const { userId } = useParams();
  const itemsData = [
    {
      label: "Nhắn tin",
      key: "1",
      icon: <PieChartOutlined />,
      children: [
        {
          info: [
            {
              id: "1877",
              name: "Phạm Tuấn Linh",
              avatar: image,
              department: "IT",
              job: "employee",
            },
            {
              id: "1878",
              name: "Izuka Namiho",
              avatar: image,
              department: "HR",
              job: "employee",
            },
            {
              id: "1879",
              name: "Tôn Ngộ Không",
              avatar: image,
              department: "HR",
              job: "employee",
            },
            {
              id: "1880",
              name: "Hàn Bảo Quân",
              avatar: image,
              department: "HR",
              job: "employee",
            },
            {
              id: "1881",
              name: "Doãn Trí Bình",
              avatar: image,
              department: "HR",
              job: "employee",
            },
            {
              id: "1882",
              name: "Kawaguchi Satoshi",
              avatar: image,
              content: "Hello Rin-san",
              time: 1111,
            },
          ],
          chat: [
            {
              user: ["Phạm Tuấn Linh", "Izuka Namiho"],
              contents: [
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 1111,
                },
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 2222,
                },
                {
                  id: "1878",
                  name: "Izuka Namiho",
                  avatar: image,
                  content: "Hello Rin-san",
                  time: 1111,
                },
              ],
            },
            {
              user: ["Phạm Tuấn Linh", "Hàn Bảo Quân"],
              contents: [
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 1111,
                },
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 2222,
                },
                {
                  id: "1880",
                  name: "Hàn Bảo Quân",
                  avatar: image,
                  content: "Hello Rin-san",
                  time: 1111,
                },
              ],
            },
            {
              user: ["Tôn Ngộ Không", "Izuka Namiho"],
              contents: [
                {
                  id: "1879",
                  name: "Tôn Ngộ Không",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 1111,
                },
                {
                  id: "1879",
                  name: "Tôn Ngộ Không",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 2222,
                },
                {
                  id: "1878",
                  name: "Izuka Namiho",
                  avatar: image,
                  content: "Hello Rin-san",
                  time: 1111,
                },
              ],
            },
            {
              user: ["Tôn Ngộ Không", "Doãn Trí Bình"],
              contents: [
                {
                  id: "1879",
                  name: "Tôn Ngộ Không",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 1111,
                },
                {
                  id: "1879",
                  name: "Tôn Ngộ Không",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 2222,
                },
                {
                  id: "1881",
                  name: "Doãn Trí Bình",
                  avatar: image,
                  content: "Hello Rin-san",
                  time: 1111,
                },
              ],
            },
            {
              user: ["Phạm Tuấn Linh", "Doãn Trí Bình"],
              contents: [
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 1111,
                },
                {
                  id: "1877",
                  name: "Phạm Tuấn Lin",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 2222,
                },
                {
                  id: "1881",
                  name: "Doãn Trí Bình",
                  avatar: image,
                  content: "Hello Rin-san",
                  time: 1111,
                },
              ],
            },
            {
              user: ["Phạm Tuấn Linh", "Kawaguchi Satoshi"],
              contents: [
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 1111,
                },
                {
                  id: "1877",
                  name: "Phạm Tuấn Linh",
                  avatar: image,
                  content: "Hello Izuka",
                  time: 2222,
                },
                {
                  id: "1882",
                  name: "Kawaguchi Satoshi",
                  avatar: image,
                  content: "Hello Rin-san",
                  time: 1111,
                },
              ],
            },
          ],
          group: {},
        },
      ],
    },
  ];

  const getUserNameById = (userId) =>
    itemsData[0]?.children[0]?.info?.find((user) => user.id === userId)?.name ||
    null;

  const userName = getUserNameById(userId);
  return (
    <>
      <Divider orientation="left">{userName}</Divider>
      <Row justify="start">
        <Col span={6}>
          <AlertComponent message={"Hello12345"} type="error" style={{width:"250px"}}/>
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginLeft: "120px",
            }}
          >
            <DeleteOutlined />
            <AliwangwangOutlined />
            <HeartOutlined />
          </div>
        </Col>
      </Row>
      <Divider orientation="right">You</Divider>
      <Row justify="end">
        <Col span={6}>
          <AlertComponent message={"Hello"} type="success" />
        </Col>
      </Row>
    </>
  );
};
export default MessengerComponent;
