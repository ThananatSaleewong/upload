import DashBoardAddItems from "../components/dashboard/DashboardAddItems";
import AppDashboardFeed from "../components/dashboard/DashBoardFeed";
import DashBoardHeader from "../components/dashboard/DashboardHeader";

function AppDashBoard() {
  return (
    <div>
      <DashBoardHeader />
      <DashBoardAddItems />
      <AppDashboardFeed />
    </div>
  );
}

export default AppDashBoard;
