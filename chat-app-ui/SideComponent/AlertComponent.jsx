import { Alert } from "antd";
// eslint-disable-next-line no-unused-vars, react/prop-types
const AlertComponent = ({ message, type }) => (
  <>
    <Alert message={message} type={type} />
    <br />
  </>
);
export default AlertComponent;
