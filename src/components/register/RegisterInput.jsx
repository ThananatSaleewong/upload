import { NavLink } from "react-router-dom";
function RegisterInput() {
  return (
    <div>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="input-large "
        />
        <input
          type="password"
          placeholder="Password"
          className="input-large "
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-large "
        />

        <button type="submit" className="btn-primary">
          REGISTER
        </button>
        <NavLink to="/">
          <p className="text-center mt-4 text-sm">
            Already have an account ? <u>Login here</u>
          </p>
        </NavLink>
      </form>
    </div>
  );
}

export default RegisterInput;
