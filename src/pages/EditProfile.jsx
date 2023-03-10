import LoginHeader from "../components/login/LoginHeader";
import { BeakerIcon, PencilIcon } from "@heroicons/react/24/solid";
function EditProfile() {
  return (
    <div className="grid justify-center items-center h-screen">
      <div className="bg-white rounded-lg border shadow-md p-4 space-y-4 w-[540px] ">
        <LoginHeader />
        <div className="grid grid-cols gap-4">
          <p className="text-xl font-semibold">Edit Profile</p>
          <div className="flex justify-between">
            <div className="relative">
              <img
                src="https://pb.bethub.link/api/files/_pb_users_auth_/4thqxu9d0hum7c1/cat_3ji3FH6Td9.jpg"
                alt=""
                className="w-36 h-36 rounded-full"
              />
              <div class="w-fit rounded-full p-1 bg-blue-500 absolute bottom-0 right-1">
                <label className="">
                  <PencilIcon class="h-6 w-6 text-white" />
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">username:</p>
              <input
                type="text"
                placeholder=""
                className="py-2 px-4 border rounded-lg"
              />
              <p className="text-lg font-semibold">email:</p>
              <input
                type="text"
                placeholder=""
                className="py-2 px-4  border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
