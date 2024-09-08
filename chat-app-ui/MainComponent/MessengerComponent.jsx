import { Col, Divider, Row } from "antd";
import AlertComponent from "../SideComponent/AlertComponent";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ItemContext } from "../SideComponent/LayoutConfigComponent";
const MessengerComponent = () => {
  const { userId } = useParams();
  const dataGetFromContext = useContext(ItemContext);
  const data = dataGetFromContext.itemsData;
  console.log("data :>> ", data);

  const getUserNameById = (userId) => 
    data[0]?.children[0]?.info?.find((user) => user.id === userId)?.name || null;

  const userName = getUserNameById(userId);
  console.log('userNameFullName :>> ', userName);

  return (
    <>
      <Divider orientation="left">{userName}</Divider>
      <Row justify="start">
        <Col span={6}>
          <AlertComponent message={"Hello"} type="error" />
          <AlertComponent message={"Hello"} type="error" />
        </Col>
      </Row>
      <Divider orientation="right">You</Divider>
      <Row justify="end">
        <Col span={6}>
          <AlertComponent message={"Hello"} type="success" />
          <AlertComponent message={"Hello"} type="success" />
        </Col>
      </Row>
    </>
  );
};
export default MessengerComponent;
