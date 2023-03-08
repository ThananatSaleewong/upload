import Login from "./pages/Login";
import {
  Route,
  Routes,
  NavLink,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import pb from "./lib/pocketbase";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  let navigate = useNavigate();

  function RequireAuth({ children }) {
    let location = useLocation();

    if (!pb.authStore.isValid) {
      console.log("pbauthstore is unvalid");
      pb.authStore.clear();
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to   send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  }
  return (
    <div className=" bg-[#F8F9FE] antialiased">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
