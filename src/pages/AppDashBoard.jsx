import DashboardAddItems from "../components/dashboard/DashboardAddItems";
import AppDashboardFeed from "../components/dashboard/DashboardFeed";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function AppDashboard(props) {
  const { logout } = props;
  return (
    <div>
      <DashboardHeader logout={logout} />
      <DashboardAddItems />
      <AppDashboardFeed />
    </div>
  );
}

export default AppDashboard;
