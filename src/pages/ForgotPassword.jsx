import { useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, NavLink } from "react-router-dom";
import pb from "../lib/pocketbase";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function sendEmailRequest(e) {
    console.log(email);
    try {
      const passwordReset = await pb
        .collection("users")
        .requestPasswordReset(email);
      toast.success("Email was send !");
      console.log(passwordReset);
    } catch (error) {
      toast.error(`Email ${error.data.data.email.message}`);
      console.log(error.data.data.email.message);
    }
  }

  return (
    <div className="grid justify-center items-center h-screen">
      <div className="bg-white rounded-lg border shadow-md p-4 space-y-4 ">
        <div className="flex justify-center items-center space-x-2">
          <img src="/image/triangle-logo.png" alt="" className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Spaces</h1>
        </div>
        <h1 className="font-bold text-xl">Find Your Account</h1>
        <p>
          Enter the email associated with your account and we’ll send you a
          recovery link:
        </p>
        <input
          type="email"
          placeholder="Email address"
          className="w-full py-2 px-4 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-between">
          <div></div>
          <div className="">
            <NavLink to="/">
              <button className="py-2 px-6 font-semibold rounded-lg border hover:bg-slate-100 ">
                Cancel
              </button>
            </NavLink>
            <button
              className="border py-2 px-3 font-semibold rounded-lg ml-3 bg-slate-600 text-white hover:bg-slate-800"
              onClick={sendEmailRequest}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
