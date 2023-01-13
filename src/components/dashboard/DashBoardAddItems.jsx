function DashBoardAddItems() {
  return (
    <div className="flex items-center justify-center w-full p-4">
      <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">CLICK TO ADD NEW</span>
          </p>
        </div>
        <input type="file" className="hidden" />
      </label>
    </div>
    // <div className="text-sm border-dashed border-2 text-center my-6 mx-6 py-4 font-semibold cursor-pointer">
    //   <input type="file"   />
    // </div>
  );
}

export default DashBoardAddItems;
