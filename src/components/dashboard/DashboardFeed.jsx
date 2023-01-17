import { useState } from "react";
import pb from "../../lib/pocketbase";
function DashboardFeed() {
  const data = {
    name: "test",
    description: "test",
    url: "https://example.com",
    date: "2022-01-01 10:00:00.123Z",
    image: "null",
  };
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }
  // console.log(file);

  async function handleChange(event, image) {
    setFile(event.target.files[0]);
    console.log(file);
    try {
      const record = await pb.collection("tools").create(image);
      console.log(image);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full p-4">
        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">CLICK TO ADD NEW</span>
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            name="file"
            value={image}
            onChange={handleChange}
          />
        </label>
      </div>
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

export default DashboardFeed;
