import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import USER_API_END_POINT from "/src/utils/constant.js";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname || !input.email || !input.phoneNumber || !input.password) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log("Server Response:", res.data); // Debugging
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Signup failed! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>

        <div className="mb-4">
          <Label className="block mb-1">Full Name</Label>
          <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Deepak Kumar"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <Label className="block mb-1">Email</Label>
          <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="example@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <Label className="block mb-1">Phone Number</Label>
          <input type="tel" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="9876543210"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <Label className="block mb-1">Password</Label>
          <input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="********"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-5">
          <Label className="block mb-2 font-medium">Select Role</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
              <Label>Recruiter</Label>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <Label className="block mb-1">Profile Picture</Label>
          <input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
        </div>

        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Sign Up</Button>

        <div className="mt-3 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
