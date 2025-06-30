import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function PasswordInput({ value, onChange, placeholder, name, ...rest }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        style={{ width: "100%", padding: "10px 35px 10px 10px", fontSize: 16, boxSizing: "border-box" }}
        {...rest}
      />
      <i
        className={`fa-solid ${show ? "fa-eye" : "fa-eye-slash"}`}
        style={{
          position: "absolute",
          right: 10,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "#888",
          fontSize: "0.8em",
          minWidth: 24,
          minHeight: 24,
          padding: 2
        }}
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={0}
      />
    </div>
  );
}

export default PasswordInput;
