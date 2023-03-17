import { Dropdown, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import pb from "../../lib/pocketbase";
import { getImageURL } from "../../lib/utils";
import { DownOutlined } from "@ant-design/icons";

function EditProfileHeader() {
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  const isLoggedIn = pb.authStore.isValid;
  let navigate = useNavigate();
  async function goDashboard() {
    await isLoggedIn;
    return navigate("/dashboard");
  }
  const items = [
    {
      label: (
        <div onClick={goDashboard}>
          <NavLink to="">Dashboard</NavLink>
        </div>
      ),
      key: "0",
    },
  ];
  return (
    <div>
      <header className="flex justify-between px-4 py-3 bg-white border-b items-center">
        <div className="flex justify-center items-center space-x-2 cursor-pointer">
          <img src="/image/triangle-logo.png" alt="" className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Spaces</h1>
        </div>
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="cursor-pointer"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className="flex items-center font-medium">
              <div className="flex items-center gap-2">
                <img
                  src={getImageURL(
                    currentUser.model.collectionId,
                    currentUser.model.id,
                    currentUser.model.avatar
                  )}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <p>{currentUser.model.name}</p>
              </div>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </header>
    </div>
  );
}
export default EditProfileHeader;
