import AppHeader from "../components/login/LoginHeader";
import AppLayout from "../components/login/LoginLayout";
import AppInput from "../components/login/LoginInput";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
const authData = await pb
  .collection("users")
  .authWithPassword("pipe@example.com", "123456789");

console.log(pb.authStore);
console.log(pb.authStore.token);
console.log(pb.authStore.model.id);

function AppLogin() {
  return (
    <AppLayout>
      <AppHeader />
      <AppInput />
    </AppLayout>
  );
}

export default AppLogin;
