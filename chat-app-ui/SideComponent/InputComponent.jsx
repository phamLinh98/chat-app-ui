import { Button, Input, Space } from "antd";

// eslint-disable-next-line react/prop-types
const InputComponent = ({ onClickButtonSubmit, content, onChange }) => {
  return (
    <>
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Input
          placeholder="Input some thing..."
          value={content}
          onChange={(e) => onChange(e.target.value)} 
          onPressEnter={onClickButtonSubmit}
        />
        <Button type="primary" onClick={onClickButtonSubmit}>
          Send
        </Button>
      </Space.Compact>
    </>
  );
};

export default InputComponent;
