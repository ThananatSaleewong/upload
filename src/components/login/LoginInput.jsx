import { NavLink } from "react-router-dom";

function LoginInput() {
  return (
    <form className="space-y-4">
      <input
        type="email"
        placeholder="Email address"
        className="input-large "
      />
      <input type="password" placeholder="Password" className="input-large " />
      <label className="flex items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-black mr-2 bg-gray-100 border-gray-300 rounded focus:ring-black "
        />
        <span class="text-sm">Remember me</span>
      </label>

      <button type="submit" className="btn-primary">
        LOGIN
      </button>
      <NavLink to="/register">
        <p className="text-center mt-4 text-sm">
          Not have an account ? <u>Register here</u>
        </p>
      </NavLink>
    </form>
  );
}

export default LoginInput;
