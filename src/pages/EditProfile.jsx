import { PencilIcon } from "@heroicons/react/24/solid";
import pb from "../lib/pocketbase";
import { useEffect, useState } from "react";
import { getImageURL } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import EditProfileHeader from "../components/editprofile/EditProfileHeader";

function EditProfile() {
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  const isLoggedIn = pb.authStore.isValid;
  const [user, setUser] = useState({ name: "", email: "" });
  const [filePreview, setFilePreview] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    setUser(currentUser.model);
    setFilePreview(
      getImageURL(
        currentUser.model.collectionId,
        currentUser.model.id,
        currentUser.model.avatar,
        100
      )
    );
  }, []);

  async function onSubmit() {
    console.log(user);
    const formData = new FormData();
    formData.append("avatar", user.avatar);
    formData.append("name", user.name);
    formData.append("email", user.email);
    try {
      const record = await pb
        .collection("users")
        .update(currentUser.model.id, formData);
      console.log(record);
      return navigate("/dashboard");
    } catch (e) {
      alert(e);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    // console.log(e.target.files);
    // const userValue = null;
    // userValue = user;
    // userValue.e.target.name = e.target.value
    // user = userValue;
    // setUser(user)
    if (name === "avatar") {
      setFilePreview(URL.createObjectURL(e.target.files[0]));
      setUser({ ...user, [name]: e.target.files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  }

  return (
    <div className="">
      <EditProfileHeader />
      <div className="p-4 max-w-[520px] mx-auto h-screen">
        <div className="grid grid-cols gap-4">
          {/* <NavLink to="/dashboard">
            <p className="font-semibold hover:underline">Back</p>
          </NavLink> */}
          <p className="text-xl font-semibold">Edit Profile</p>
          <div className="flex gap-8">
            <div className="relative w-1/3">
              <img
                src={filePreview}
                alt=""
                className="w-36 h-36 rounded-full"
              />
              <div className="w-fit rounded-full p-1 bg-blue-500 absolute bottom-0 right-3">
                <label className=" cursor-pointer">
                  <PencilIcon className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    name="avatar"
                  />
                </label>
              </div>
            </div>
            <div className="w-2/3">
              <p className="text-lg font-semibold">username:</p>
              <Input
                type="text"
                placeholder="create your username"
                className="py-2 px-4 border rounded-lg w-full"
                value={user.name}
                name="name"
                onChange={handleChange}
              />
              <p className="text-lg font-semibold">email:</p>
              <Input
                type="text"
                placeholder=""
                className="py-2 px-4  border rounded-lg w-full"
                value={user.email}
                name="email"
                readOnly
              />
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="bg-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:text-white"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
