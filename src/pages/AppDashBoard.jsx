import DashboardAddItems from "../components/dashboard/DashboardAddItems";
import AppDashboardFeed from "../components/dashboard/DashboardFeed";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function AppDashBoard() {
  return (
    <div>
      <DashBoardHeader />
      <DashBoardAddItems />
      <AppDashboardFeed />
    </div>
  );
}

export default AppDashboard;
