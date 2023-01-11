import Layout from "../components/Layout";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterInput from "../components/register/RegisterInput";
import { useState } from "react";
import pb from "../lib/pocketbase";
function AppRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const data = {
    username: "test_username2",
    email: "test2@example.com",
    emailVisibility: true,
    password: "12345678",
    passwordConfirm: "12345678",
    name: "test2",
  };

  async function handleOnSubmit() {
    // const record = await pb.collection('users').create(data);
    console.log(email, password, confirmPassword);
    try {
      const record = await pb.collection("users").create({ data });
      // await pb.collection('users').requestVerification('test11@example.com');
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Layout>
      <RegisterHeader />
      <RegisterInput
        handleOnSubmit={handleOnSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </Layout>
  );
}

export default AppRegister;
