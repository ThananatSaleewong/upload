import LoginHeader from "../components/login/LoginHeader";
import { ArrowUturnLeftIcon, PencilIcon } from "@heroicons/react/24/solid";
import pb from "../lib/pocketbase";
import { getImageURL } from "../lib/utils";
import { NavLink } from "react-router-dom";

function EditProfile() {
  const isLoggedIn = pb.authStore.isValid;
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  console.log(currentUser, isLoggedIn);
  console.log(currentUser.model.email);

  async function handleChange(event) {
    try {
      const record = await pb.collection("users").update("avatar", currentUser);
      console.log(event);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="grid justify-center items-center h-screen">
      <div className="bg-white rounded-lg border shadow-md p-4 space-y-4 w-[540px] ">
        <LoginHeader />
        <div className="grid grid-cols gap-4">
          <NavLink to="/dashboard">
            <ArrowUturnLeftIcon className="w-8 h-8" />
          </NavLink>
          <p className="text-xl font-semibold">Edit Profile</p>
          <div className="flex gap-8">
            <div className="relative w-1/3">
              <img
                src={getImageURL(
                  currentUser.model.collectionId,
                  currentUser.model.id,
                  currentUser.model.avatar
                )}
                alt=""
                className="w-36 h-36 rounded-full"
              />
              <div className="w-fit rounded-full p-1 bg-blue-500 absolute bottom-0 right-3">
                <label className="">
                  <PencilIcon className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => handleChange(event)}
                  />
                </label>
              </div>
            </div>
            <div className="w-2/3">
              <p className="text-lg font-semibold">username:</p>
              <input
                type="text"
                placeholder=""
                className="py-2 px-4 border rounded-lg w-full"
                value={currentUser.model.username}
              />
              <p className="text-lg font-semibold">email:</p>
              <div className="px-4 py-2 ">{currentUser.model.email}</div>
            </div>
          </div>
          <button className="bg-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
