import AppHeader from "../components/login/LoginHeader";
import AppLayout from "../components/login/LoginLayout";
import AppInput from "../components/login/LoginInput";
import pb from "../lib/pocketbase";
import { useState } from "react";
import AppDashBoard from "./AppDashBoard";

function AppLogin() {
  const isLoggedIn = pb.authStore.isValid;
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(0);
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

  function logout() {
    pb.authStore.clear();
    setDummy(Math.random);
  }
  if (isLoggedIn)
    return (
      <AppDashBoard logout={logout} />
      // <>
      //   <h1>Logged In:{pb.authStore.model.email}</h1>
      //   <button onClick={logout} className="border p-4 bg-slate-100">
      //     Logout
      //   </button>
      // </>
    );

  return (
    <AppLayout>
      {isLoading && <p>Loading....</p>}
      <h1>Logged In:{pb.authStore.isValid.toString()}</h1>
      {isLoggedIn ? "True" : "False"}
      <AppHeader />
      <AppInput
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        login={login}
        isLoading={isLoading}
      />
    </AppLayout>
  );
}

export default AppLogin;
