import { Button } from "antd";
// eslint-disable-next-line react/prop-types
const ButtonComponent = ({name, typeSubmit, type}) => (
    <Button type={type} htmlType={typeSubmit}>
      {name}
    </Button>
);
export default ButtonComponent;
