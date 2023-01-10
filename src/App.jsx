import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import AppLogin from "./pages/AppLogin";
import { Route, Routes, NavLink } from "react-router-dom";
import AppRegister from "./pages/AppRegister";
import AppError from "./pages/AppError";
import AppDashBoard from "./pages/AppDashBoard";
const pb = new PocketBase("http://127.0.0.1:8090");

function App() {
  const [toolData, setToolsData] = useState([]);
  const fetchAllTools = async () => {
    const resultList = await pb.collection("tools").getList(1, 50, {
      filter: 'created >= "2022-01-01 00:00:00" && someFiled1 != someField2',
    });
    console.log(resultList.items);
  };
  useEffect(() => {
    fetchAllTools();
  }, []);

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
