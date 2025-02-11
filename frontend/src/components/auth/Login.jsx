import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import USER_API_END_POINT from "/src/utils/constant.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice"; 

function Login() {
  const [input, setInput] = useState({ email: "", password: "", role: "student" });
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      dispatch(setLoading(true)); // 🔥 Redux me loading set karna
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Login failed! Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

        <div className="mb-4">
          <Label className="block mb-1">Email</Label>
          <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="example@gmail.com"
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

        {loading && (
          <button disabled className="w-full flex items-center justify-center p-2 bg-gray-300 rounded-lg">
            <span className='mr-2 h-4 w-4 animate-spin'>⏳</span>
            Please Wait
          </button>
        )}

        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="mt-3 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
