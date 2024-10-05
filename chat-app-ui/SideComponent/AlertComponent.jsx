import { Alert } from "antd";
// eslint-disable-next-line no-unused-vars, react/prop-types
const AlertComponent = ({ message, type }) => (
  <>
    <Alert message={message} type={type} style={{maxWidth:"260px", marginBottom:"5px"}}/>
    <br />
  </>
);
export default AlertComponent;
