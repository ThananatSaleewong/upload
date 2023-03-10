import { Input } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function RegisterInput(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    handleOnSubmit,
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="space-y-4">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-large"
        size="large"
      />
      <Input.Password
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-large"
        size="large"
      />
      <Input.Password
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm Password"
        className="input-large"
        size="large"
      />
      <button onClick={handleOnSubmit} className="btn-primary">
        REGISTER
      </button>
      <NavLink to="/">
        <p className="text-center mt-4 text-sm">
          Already have an account ? <u>Login here</u>
        </p>
      </NavLink>
    </div>
  );
}

export default RegisterInput;
