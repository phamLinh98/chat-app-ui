import { Card } from "antd";

const nameCompany = (
  <img
    src={
      "https://rrdarlkddjxzqbcojwdc.supabase.co/storage/v1/object/public/image/4444.png"
    }
    style={{ height: "105px", width: "345px", borderRadius: "5px", border: "1px solid"}}
  />
);

// eslint-disable-next-line react/prop-types
const FormComponent = ({ children }) => (
  <Card
    title={nameCompany}
    bordered={false}
    style={{
      width: "400px",
      marginTop: "100px",
    }}
  >
    {children}
  </Card>
);

export default FormComponent;
