/* eslint-disable react/prop-types */
import { Button } from "antd";
export const ButtonLoginComponent = ({ name, typeSubmit, type }) => (
  <Button type={type} htmlType={typeSubmit}>
    {name}
  </Button>
);

export const ButtonSignInComponent = ({ name, typeSubmit }) => (
  <Button type={"dashed"} onClick={typeSubmit}>
    {name}
  </Button>
);
