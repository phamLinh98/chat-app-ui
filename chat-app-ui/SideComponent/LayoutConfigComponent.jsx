import { createContext } from "react";
import image from "../src/assets/images/1.jpeg";
import { PieChartOutlined } from "@ant-design/icons";

export const ItemContext = createContext();

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
// eslint-disable-next-line react/prop-types
export const LayoutConfigComponent = ({ children }) => {
  return (
    <ItemContext.Provider value={{ itemsData }}>
      {children}
    </ItemContext.Provider>
  );
};

