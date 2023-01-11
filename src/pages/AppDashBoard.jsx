import DashBoardAddItems from "../components/dashboard/DashBoardAddItems";
import DashBoardHeader from "../components/dashboard/DashBoardHeader";

function AppDashBoard() {
  return (
    <div>
      <DashBoardHeader />
      <DashBoardAddItems />
      <div className="grid grid-cols-4 m-6 p-4">
        <div className="flex justify-between items-center bg-white p-2 border rounded-md">
          <div className="flex">
            <img
              src="https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg"
              alt=""
              className="w-10 h-10 mr-2"
            />
            <div className="">
              <p className="font-semibold text-sm">IMG_1234.jpg</p>
              <p className="text-xs text-gray-400">11 Jan 2023</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AppDashBoard;
