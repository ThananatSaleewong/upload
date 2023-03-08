import LoginHeader from "../components/login/LoginHeader";
import LoginLayout from "../components/login/LoginLayout";
import LoginInput from "../components/login/LoginInput";
import pb from "../lib/pocketbase";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    if (e.key === "Enter" || e.type === "click") {
      setLoading(true);
      console.log(email, password);
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(email, password);
      } catch (e) {
        toast.error(e?.message);
        console.log(e.data);
      }
      setLoading(false);
    }
  }

  if (pb.authStore.isValid) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LoginLayout>
      {isLoading && <p className="text-md font-semibold">Loading....</p>}
      <LoginHeader />
      <LoginInput
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        login={login}
        isLoading={isLoading}
      />
    </LoginLayout>
  );
}

export default Login;
