import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../redux/authSlice";

const USER_API_END_POINT = "http://localhost:9001/api/v1/user";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills)
      ? user.profile.skills.join(", ")
      : user?.profile?.skills || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] || null });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const formData = new FormData();
  
      // Append all fields to FormData
      Object.entries(input).forEach(([key, value]) => {
        if (value) {
          formData.append(key, key === "skills" ? value.split(",").map((s) => s.trim()).join(",") : value);
        }
      });
  
      // Use POST instead of PUT
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully!");
        setOpen(false);
      } else {
        toast.error(res.data.message || "Update failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          {["fullname", "email", "phoneNumber", "bio"].map((field) => (
            <div key={field} className="grid gap-4 py-2">
              <label htmlFor={field} className="font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={input[field]}
                onChange={changeEventHandler}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          ))}

          <div className="grid gap-4 py-2">
            <label htmlFor="skills" className="font-medium">Skills (comma-separated)</label>
            <input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="grid gap-4 py-2">
            <label htmlFor="file" className="font-medium">Resume (PDF)</label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              onChange={fileChangeHandler}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "⏳ Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;