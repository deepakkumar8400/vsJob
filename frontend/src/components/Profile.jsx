import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import logo from "@/assets/download.jpg";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const avatarUrl = user?.profile?.avatar || logo;

  // ✅ Ensure skills is an array (handles string conversion)
  const skills = Array.isArray(user?.profile?.skills)
    ? user.profile.skills
    : typeof user?.profile?.skills === "string"
    ? user.profile.skills.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl} alt="User Avatar" />
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{user?.fullname || "User Name"}</h1>
            <p className="text-gray-600">Software Developer | Passionate Coder</p>
          </div>
        </div>
        <Button onClick={() => setOpen(true)} variant="outline">
          <Pen className="w-5 h-5" />
        </Button>
      </div>

      <div className="mt-4">
        <p className="text-gray-700">📧 Email: {user?.email || "abc@gmail.com"}</p>
        <p className="text-gray-700">📞 Phone: {user?.phoneNumber || "8400663713"}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="flex gap-2 mt-2">
          {skills.length ? (
            skills.map((skill, i) => (
              <Badge key={i} className="bg-blue-100 text-blue-700 px-3 py-1">{skill}</Badge>
            ))
          ) : (
            <span className="text-gray-500">No skills added</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Resume</h2>
        {user?.profile?.resume ? (
          <a target="_blank" rel="noopener noreferrer" href={user.profile.resume} className="text-blue-600 underline">
            View Resume
          </a>
        ) : (
          <span className="text-gray-500">Resume not available</span>
        )}
      </div>

      <AppliedJobTable />

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
