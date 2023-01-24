import moment from "moment/moment";
import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import { getImageURL } from "../../lib/utils";
import React from "react";
import { Dropdown, Space } from "antd";

const items = [
  {
    label: <a href="https://www.antgroup.com">copy</a>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "delete",
    key: "3",
  },
];

function DashboardFeed() {
  const data = {
    name: "test",
    description: "test",
    url: "https://example.com",
    date: "2022-01-01 10:00:00.123Z",
    image: "null",
  };
  const [file, setFile] = useState();
  const [imageList, setImageList] = useState(null);

  useEffect(() => {
    fetchImageData();
  }, []);

  const fetchImageData = async (event) => {
    try {
      const resultList = await pb.collection("upload").getList(1, 20);
      pb.autoCancellation(false);
      console.log(resultList);
      setImageList(resultList);
    } catch (e) {
      alert(e);
    }
  };

  async function handleChange(event, image) {
    const formData = new FormData();
    formData.append("field", event.target.files[0]);
    formData.append("title", event.target.files[0].name);

    try {
      const record = await pb.collection("upload").create(formData);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full p-4">
        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
          <div className="flex flex-col items-center justify-center py-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">CLICK TO ADD NEW</span>
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(event) => handleChange(event)}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 p-4 ">
        {imageList?.items.map((data, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-2 border rounded-md mr-2 mb-2"
          >
            <img
              src={getImageURL(data.collectionId, data.id, data.field, 100)}
              alt=""
              className="w-10 h-10 mr-2"
            />
            <div className="">
              <p className="font-semibold text-sm">{data.title}</p>
              <p className="text-xs text-gray-400">
                {moment(data.created).format("DD/MM/YYYY")}
              </p>
            </div>
            <Dropdown
              className=" flex"
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
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
                </Space>
              </a>
            </Dropdown>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardFeed;
