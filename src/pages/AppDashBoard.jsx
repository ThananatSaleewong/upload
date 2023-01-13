import DashboardAddItems from "../components/dashboard/DashboardAddItems";
import DashboardFeed from "../components/dashboard/DashboardFeed";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function AppDashboard() {
  return (
    <div>
      <DashboardHeader />
      <DashboardAddItems />
      <DashboardFeed />
    </div>
  );
}

export default AppDashboard;
