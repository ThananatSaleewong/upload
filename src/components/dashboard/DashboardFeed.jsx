function AppDashboardFeed() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 p-4">
        <div className="flex justify-between items-center bg-white p-2 border rounded-md">
          <div className="flex">
            <img
              src="https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg"
              alt=""
              className="w-10 h-10 mr-2"
            />
            <div className="">
              <p className="font-semibold text-sm">IMG_1234.jpg</p>
              <p className="text-xs text-gray-400">11 Jan 2012</p>
              {/* <p>{currentUser}</p> */}
            </div>
          </div>

          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-5 h-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AppDashboardFeed;
