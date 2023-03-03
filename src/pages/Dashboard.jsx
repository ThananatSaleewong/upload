import { useNavigate } from "react-router-dom";
import DashboardFeed from "../components/dashboard/DashboardFeed";

import pb from "../lib/pocketbase";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  const isLoggedIn = pb.authStore.isValid;
  let navigate = useNavigate();
  console.log(currentUser, isLoggedIn);

  async function logout() {
    console.log("work");
    await pb.authStore.clear();
    return navigate("/");
  }

  return (
    <div>
      <header className="flex justify-between px-4 py-3 bg-white border-b items-center">
        <div className="flex justify-center items-center space-x-2 cursor-pointer">
          <img src="/image/triangle-logo.png" alt="" className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Spaces</h1>
        </div>
        <div className="flex items-center font-medium">
          <p>{currentUser.model.name}</p>
          <button
            onClick={logout}
            className="p-4 bg-red-600 text-white font-semibold rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      <DashboardFeed currentUser={currentUser} />
    </div>
  );
}

export default Dashboard;
