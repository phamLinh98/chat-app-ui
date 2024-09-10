import { Card } from "antd";

const nameCompany = (
  <p style={{ textAlign: "center", margin: 0 }}>Proterial Company</p>
);

// eslint-disable-next-line react/prop-types
const FormComponent = ({ children }) => (
  <Card
    title={nameCompany}
    bordered={false}
    style={{
      width: 500,
    }}
  >
    {children}
  </Card>
);

export default FormComponent;
