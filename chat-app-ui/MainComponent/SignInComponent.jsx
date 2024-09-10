import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const SiginInComponent = ({ handleSubmit }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Tài khoản Email</label>
          <input
            type="text"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
          <label>Mã Nhân Viên</label>
          <input
            type="text"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
          <label>Bộ Phận</label>
          <input
            type="text"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Mật khẩu: </label>
          <input
            type="password"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
          <label>Nhập Lại Mật Khẩu: </label>
          <input
            type="password"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          Create
        </button>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px",
            backgroundColor: "red",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
