import DashBoardAddItems from "../components/dashboard/DashboardAddItems";
import AppDashboardFeed from "../components/dashboard/DashBoardFeed";
import DashBoardHeader from "../components/dashboard/DashboardHeader";

function AppDashBoard(props) {
  const { logout } = props;
  return (
    <div>
      <DashBoardHeader logout={logout} />
      <DashBoardAddItems />
      <AppDashboardFeed />
    </div>
  );
}

export default AppDashBoard;
