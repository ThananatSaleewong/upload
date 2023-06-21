import moment from "moment/moment";
import { useEffect, useState } from "react";
import pb from "../lib/pocketbase";
import {
  getImageURL,
  copyUrl,
  getImageURLFull,
  // getImageURLfolder,
} from "../lib/utils";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown, Pagination, Button, Modal, Input, Form } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";

const items = [
  {
    key: "1",
    label: <div>Copy</div>,
  },
  {
    key: "2",
    label: <div>Delete</div>,
  },
];

const items1 = [
  {
    key: "1",
    label: <div>Copy</div>,
  },
];

const data = {
  name: "test",
  uploadId: ["RELATION_RECORD_ID"],
  createdById: "RELATION_RECORD_ID",
};
export default function FolderPage() {
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  // console.log(currentUser)
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("folderId"));
  const location = useLocation();
  // console.log(location.search);
  let navigate = useNavigate();
  const isLoggedIn = pb.authStore.isValid;
  // const searchParams = new URLSearchParams(document.location.search);
  // console.log(searchParams.get("p"));

  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({ page: 1, pageSize: 24 });
  const [folderData, setFolderData] = useState(null);

  console.log(location)
  useEffect(() => {
    fetchFolderData();
  }, [page]);

  // useEffect(() => {
  //   fetchImageData();
  // }, [folderData]);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const fetchFolderData = async (event) => {
    setLoading(true);
    // let folderData = null;
    try {
      const record = await pb
        .collection("folders")
        .getOne(searchParams.get("folderId"), {
          expand: "relField1,relField2.subRelField",
        });
      // folderData = record;
      setFolderData(record);
    } catch (err) {
      toast.success(err, {
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
    console.log(imageList);

    console.log(folderData);
    // fetchImageData(folderData);
  };

  const fetchImageData = async () => {
    console.log("in");
    // folderData?.uploadId.forEach(async (data) => {
    try {
      // const record = await pb.collection("upload").getOne(data, {
      //   expand: "relField1,relField2.subRelField",
      // });
      const resultList = await pb.collection("upload").getList(1, 50, {
        filter: 'id="if27s0xy5tap08i"',
      });
      // console.log(resultList.items)
      imageList.push(resultList.items);
      // setImageList(resultList);
    } catch (err) {
      toast.success(err, {
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
    // });
    setLoading(false);
  };

  const handleDeleteImage = async (targetImg) => {
    const toastId = toast.loading("Loading...");
    try {
      const deleteImg = await pb.collection("upload").delete(targetImg);
      toast.success("Deleted !");
      await fetchFolderData();
    } catch (error) {
      toast.error("asdasd", {
        duration: 3000,
        className: "bg-red-100 p-4 font-semebold",
      });
    }
    toast.dismiss(toastId);
  };

  async function handleChange(event) {
    console.log(event.target.files.fileList);
    const { files } = event.target;
    let newUploadMultifiles = [];
    if (files.length === 1) {
      const toastId = toast.loading("Loading...");
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("title", files[0].name);
      formData.append("uploader", currentUser?.model.id);
      formData.append("email", currentUser?.model.email);
      formData.append("folderId", searchParams.get("folderId"));
      setLoading(true);
      toastId;
      try {
        const res = await pb.collection("upload").create(formData);
        const record = await pb
          .collection("folders")
          .update(searchParams.get("folderId"), {
            uploadId: [res.id],
            imageList: folderData?.imageList
              ? folderData?.imageList.concat([
                  {
                    name: res.image[0],
                    image_id: res.id,
                  },
                ])
              : [
                  {
                    name: res.image[0],
                    image_id: res.id,
                  },
                ],
          });
        toast.success("Successfully toasted!");
        // setImageList();
        //1. Diable button
        //2. Change button content to Loading blah blah
        await fetchFolderData();
      } catch (error) {
        console.log(error);
        const errorMessage = error.data.data.image.message || "Unknown error";
        toast.error(errorMessage, {
          duration: 3000,
          className: "bg-red-100 p-4 font-semebold",
        });
      }
      setLoading(false);
      toast.dismiss(toastId);
    }
    if (files.length > 1) {
      setLoading(true);
      Array.from(files).map((data, index) => {
        const toastId = toast.loading("Loading...");
        const formData = new FormData();
        formData.append("image", data);
        formData.append("title", data.name);
        formData.append("uploader", currentUser?.model.id);
        formData.append("email", currentUser?.model.email);
        formData.append("folderId", searchParams.get("folderId"));
        toastId;
        // try {
        const res = pb
          .collection("upload")
          .create(formData)
          .then((response) => {
            toast.success("Successfully toasted!");
            newUploadMultifiles.push({
              name: response.image[0],
              image_id: response.id,
            });
            if (files.length === index + 1) {
              console.log(newUploadMultifiles);
              const record = pb
                .collection("folders")
                .update(searchParams.get("folderId"), {
                  uploadId: folderData?.uploadId,
                  imageList: folderData?.imageList.concat(newUploadMultifiles),
                })
                .then(() => fetchFolderData());
            }
          })
          .catch((error) => {
            const errorMessage =
              error.data.data.image.message || "Unknown error";
            toast.error(errorMessage, {
              duration: 3000,
              className: "bg-red-100 p-4 font-semebold",
            });
          });
        toast.dismiss(toastId);
        // } catch (error) {
        //   console.log(error);
        //   const errorMessage = error.data.data.image.message || "Unknown error";
        //   toast.error(errorMessage, {
        //     duration: 3000,
        //     className: "bg-red-100 p-4 font-semebold",
        //   });
        // }
        // toast.dismiss(toastId);
      });
      // if (status === "done") {
      console.log(newUploadMultifiles);
      // const record = await pb
      //   .collection("folders")
      //   .update(searchParams.get("folderId"), {
      //     uploadId: [newUploadMultifiles[0].image_id],
      //     imageList: folderData?.imageList.concat(newUploadMultifiles),
      //   });
      setLoading(false);
    }
  }
  const handleMenuClick = (e, data) => {
    if (e.key === "1") {
      copyUrl(getImageURLFull("3turja16y46j51j",data.image_id,data.name));
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

  const onChangePagination = (page, pageSize) => {
    setPage({ ...page, page: page, pageSize: pageSize });
  };

  const onChangePaginationSize = (current, size) => {
    setPage({ ...page, page: 1, pageSize: size });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dropzone file upload */}
      <label className="grid place-content-center border border-indigo-600 text-indigo-600 rounded-full cursor-pointer bg-indigo-600/25 hover:bg-indigo-600 hover:text-white fixed right-4 bottom-4 h-20 w-20">
        <p className="text-3xl font-bold leading-3 -mt-2 ">+</p>
        <input
          type="file"
          // disabled={loading}
          className="hidden"
          onChange={(event) => handleChange(event)}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/webp, image/svg"
          multiple
        />
      </label>
      {/* Image grid loop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {folderData?.imageList?.map((data, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-2 border rounded-md"
          >
            <div
              onClick={() =>
                openInNewTab(
                  getImageURL("3turja16y46j51j", data.image_id, data.name)
                )
              }
              className="flex gap-2 items-center cursor-pointer "
            >
              <img
                src={getImageURL(
                  "3turja16y46j51j",
                  data.image_id,
                  data.name,
                  // data.uploadId,
                  100
                )}
                alt=""
                className="w-36 h-36 mr-2"
              />
              <div className="">
                <p className="font-semibold text-sm">{data.title}</p>
                <p className="text-xs text-gray-400">
                  {moment(data.created).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <Dropdown
              menu={
                currentUser?.model.id === data.uploader
                  ? {
                      items: items,
                      onClick: (e) => handleMenuClick(e, data),
                    }
                  : {
                      items: items1,
                      onClick: (e) => handleMenuClick(e, data),
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
        ))}
      </div>
      <Pagination
        pageSize={page.pageSize}
        pageSizeOptions={[24, 48, 84]}
        total={imageList?.totalItems}
        showSizeChanger
        onChange={onChangePagination}
        onShowSizeChange={onChangePaginationSize}
      />
    </div>
  );
}
