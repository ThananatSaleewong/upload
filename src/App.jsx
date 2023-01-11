import AppLogin from "./pages/AppLogin";
import { Route, Routes, NavLink } from "react-router-dom";
import AppRegister from "./pages/AppRegister";
import AppError from "./pages/AppError";
import AppDashBoard from "./pages/AppDashBoard";


function App() {


  return (
    <div className="h-screen bg-[#F8F9FE]">
      <Routes>
        <Route path="/" element={<AppLogin />} />
        <Route path="/register" element={<AppRegister />} />
        <Route path="/dashboard" element={<AppDashBoard />} />
        <Route path="*" element={<AppError />} />
      </Routes>
    </div>
  );
}

export default App;
