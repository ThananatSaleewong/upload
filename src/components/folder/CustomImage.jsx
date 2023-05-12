import moment from "moment";
import { getImageURL, getImageURLFull } from "../../lib/utils";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useEffect, useState } from "react";

const CustomImage = ({ record, currentUser, index = 0 }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(image)
  // useEffect(() => {
  //     setImage(record);
  // }, [record,currentUser ]);

  console.log(record);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleMenuClick = (e, data) => {
    if (e.key === "1") {
      copyUrl(getImageURLFull(data.collectionId, data.id, data.image));
      toast.success(`คัดลอกลิงค์ ${data.title} แล้ว`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (e.key === "2") {
      handleDeleteImage(data.id);
    }
  };
  return (
    <div className="flex justify-between items-center bg-white p-2 border rounded-md">
      <div
        onClick={() =>
          openInNewTab(
            getImageURL(
              record?.collectionId,
              record?.id,
              record?.image?.data.uploadId
            )
          )
        }
        className="flex gap-2 items-center cursor-pointer "
      >
        <img
          src={getImageURL(
            record?.collectionId,
            record?.id,
            record?.image,
            record?.uploadId,
            100
          )}
          alt=""
          className="w-36 h-36 mr-2"
        />
        <div className="">
          <p className="font-semibold text-sm">{record?.title}</p>
          <p className="text-xs text-gray-400">
            {moment(record?.created).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <Dropdown
        menu={
          currentUser?.model?.id === image?.uploader
            ? {
                items: items,
                onClick: (e) => handleMenuClick(e, image),
              }
            : {
                items: items1,
                onClick: (e) => handleMenuClick(e, image),
              }
        }
        trigger={["click"]}
        className="cursor-pointer"
      >
        <a onClick={(e) => e.preventDefault()}>
          <EllipsisOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default CustomImage;
