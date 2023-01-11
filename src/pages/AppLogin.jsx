import AppHeader from "../components/login/LoginHeader";
import AppLayout from "../components/login/LoginLayout";
import AppInput from "../components/login/LoginInput";
import pb from "../lib/pocketbase";
import { useState } from "react";

function AppLogin() {
  const isLoggedIn = pb.authStore.isValid;
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(data) {
    setLoading(true);
    console.log(email, password);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  return (
    <AppLayout>
      {isLoading && <p>Loading....</p>}
      {isLoggedIn ? "True" : "False"}
      <AppHeader />
      <AppInput
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        login={login}
      />
    </AppLayout>
  );
}

export default AppLogin;
