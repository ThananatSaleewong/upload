import { Input } from "antd";
import { NavLink } from "react-router-dom";

function LoginInput(props) {
  const { email, setEmail, password, setPassword, login, isLoading } = props;
  return (
    <div className="space-y-4" method="POST" onKeyDown={login}>
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
      <label className="flex items-center justify-between">
        <div></div>
        <NavLink to="forgotpassword">
          <div className="text-sm cursor-pointer hover:underline">
            Forgotten password ?
          </div>
        </NavLink>
      </label>
      <button className="btn-primary" onClick={login} disabled={isLoading}>
        {isLoading ? "Loading" : "LOGIN"}
      </button>
      <NavLink to="/register">
        <p className="text-center mt-4 text-sm">
          Not have an account ? <u>Register here</u>
        </p>
      </NavLink>
    </div>
  );
}

export default LoginInput;
