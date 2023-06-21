import moment from "moment/moment";
import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import { getImageURL, copyUrl, getImageURLFull } from "../../lib/utils";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown, Pagination, Button, Modal, Input, Form } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

export default function DashboardFeed(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const isLoggedIn = pb.authStore.isValid;
  const searchParams = new URLSearchParams(document.location.search);
  const { currentUser } = props;
  const [imageList, setImageList] = useState(null);
  const [folderList, setFolderList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({ page: 1, pageSize: 24 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e) => {
    setLoading(true);
    setIsModalOpen(false);
    const data = {
      name: e.name,
      // uploadId: ["RELATION_RECORD_ID"],
      createdById: currentUser.model.id,
    };
    console.log(e);
    try {
      const record = await pb.collection("folders").create(data);
      window.location.reload();
    } catch {}
    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const goFolderPage = (folderId) =>
    navigate({
      pathname: "/folder",
      search: `?folderId=${folderId}`,
    });
  // const { toasts, handlers } = useToast();
  // console.log(imageList);
  useEffect(() => {
    fetchImageData();
    fetchFolderData();
  }, [page]);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  const fetchFolderData = async (event) => {
    setLoading(true);
    try {
      const resultList = await pb
        .collection("folders")
        .getList(page.page, page.pageSize, {
          sort: "-created",
        });
      setFolderList(resultList);
      console.log(resultList);
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
    setLoading(false);
  };
  const fetchImageData = async (event) => {
    setLoading(true);
    try {
      const resultList = await pb
        .collection("upload")
        .getList(page.page, page.pageSize, {
          sort: "-created",
        });
      setImageList(resultList);
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
    setLoading(false);
  };

  const handleDeleteImage = async (targetImg) => {
    const toastId = toast.loading("Loading...");
    try {
      const deleteImg = await pb.collection("upload").delete(targetImg);
      toast.success("Deleted !");
      await fetchImageData();
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
    if (files.length === 1) {
      const toastId = toast.loading("Loading...");
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("title", files[0].name);
      formData.append("uploader", currentUser?.model.id);
      formData.append("email", currentUser?.model.email);
      setLoading(true);
      toastId;
      console.log(formData);
      try {
        const res = await pb.collection("upload").create(formData);
        toast.success("Successfully toasted!");
        //1. Diable button
        //2. Change button content to Loading blah blah
        await fetchImageData();
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
      Array.from(files).map((data, index) => {
        console.log(data);
        const toastId = toast.loading("Loading...");
        const formData = new FormData();
        formData.append("image", files[index]);
        formData.append("title", files[index].name);
        formData.append("uploader", currentUser?.model.id);
        formData.append("email", currentUser?.model.email);
        setLoading(true);
        toastId;
        try {
          const res = pb.collection("upload").create(formData);
          toast.success("Successfully toasted!");
          //1. Diable button
          //2. Change button content to Loading blah blah
          fetchImageData();
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
      });
    }
  }

  (async function () {
    const resultList = await pb.collection("upload").getList(1, 50, {
      filter: `folderId = "tc23lbrptbbtx6r"`,
    });
    console.log(resultList);
  })();

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

  const onChangePagination = (page, pageSize) => {
    setPage({ ...page, page: page, pageSize: pageSize });
  };

  const onChangePaginationSize = (current, size) => {
    setPage({ ...page, page: 1, pageSize: size });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Reorder the items
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const updatedItems = Array.from(imageList.items);
    const [removed] = updatedItems.splice(startIndex, 1);
    updatedItems.splice(endIndex, 0, removed);

    // Update the state with the new order
    setImageList({ ...imageList, items: updatedItems });
  };

  // ...

  return (
    <div className="p-4 space-y-4">
      {/* Dropzone file upload */}
      <label className="grid place-content-center border border-indigo-600 text-indigo-600 rounded-full cursor-pointer bg-indigo-600/25 hover:bg-indigo-600 hover:text-white fixed right-4 bottom-4 h-20 w-20">
        <p className="text-3xl font-bold leading-3 -mt-2 ">+</p>
        <input
          type="file"
          disabled={loading}
          className="hidden"
          onChange={(event) => handleChange(event)}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/webp, image/svg"
          multiple
        />
      </label>

      {/* Image grid loop */}

      <Button
        type="primary"
        onClick={showModal}
        className="text-black border-blue-500"
      >
        Create Folder
      </Button>
      <Modal
        title="Create Folder"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={
          [
            // <Button key="back" onClick={handleCancel} className="">
            //   Cancel
            // </Button>,
          ]
        }
      >
        <Form onFinish={handleOk}>
          <Form.Item name="name">
            <Input placeholder="create folder name" />
          </Form.Item>
          <div className="flex justify-end space-x-3">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="text-black border-blue-500 font-semibold"
              >
                Submit
              </Button>
            </Form.Item>
            <Button key="back" onClick={handleCancel} className="">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
      <div className="flex space-x-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="folders">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex space-x-4">
                {folderList?.items.map((data, index) => (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-slate-300 w-32 h-32 text-center flex justify-center items-center rounded-xl border font-semibold"
                        onClick={() => goFolderPage(data.id)}
                      >
                        <NavLink>{data.name}</NavLink>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="">
      <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {imageList?.items.map((data, index) => {
                  if (!data.folderId) {
                    return (
                      <Draggable key={data.id} draggableId={data.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex justify-between items-center bg-white p-2 border rounded-md"
                          >
              <div
                onClick={() =>
                  openInNewTab(
                    getImageURL(data.collectionId, data.id, data.image)
                  )
                }
                className="flex gap-2 items-center cursor-pointer "
              >
                <img
                  src={getImageURL(data.collectionId, data.id, data.image, 100)}
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
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
