import { Input } from "antd";
const { Search } = Input;

// eslint-disable-next-line react/prop-types
const InputComponent = ({ placeholder, value, onInputChange, onSubmit }) => {
  return (
    <Search
      placeholder={placeholder}
      value={value} // Nhận giá trị từ prop `value`
      enterButton="Gửi"
      size="large"
      onChange={(e) => onInputChange(e.target.value)} // Update parent state on input change
      onSearch={onSubmit} // Trigger submission on button click or enter press
    />
  );
};

export default InputComponent;
