import { Card } from "antd";

const nameCompany = (
  <p style={{ textAlign: "center", margin: 0 }}>PROTERIAL COMPANY</p>
);

// eslint-disable-next-line react/prop-types
const FormComponent = ({ children }) => (
  <Card
    title={nameCompany}
    bordered={false}
    style={{
      width: "300px",
      marginTop: "100px",
    }}
  >
    {children}
  </Card>
);

export default FormComponent;
