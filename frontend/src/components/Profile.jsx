import logo from "@/assets/download.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const skills = React.useMemo(() => {
    if (Array.isArray(userData?.profile?.skills)) return userData.profile.skills;
    if (typeof userData?.profile?.skills === "string") return userData.profile.skills.split(",").map((skill) => skill.trim());
    return [];
  }, [userData]);

  const avatarUrl = userData?.profile?.avatar || logo;

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl} alt="User Avatar" />
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{userData?.fullname || "User Name"}</h1>
            <p className="text-gray-600">{userData?.profile?.bio || "No bio available"}</p>
          </div>
        </div>
        <Button onClick={() => setOpen(true)} variant="outline">
          <Pen className="w-5 h-5" />
        </Button>
      </div>

      {/* Contact Details */}
      <div className="mt-4 space-y-2">
        {["Email", "Phone"].map((field, idx) => (
          <p key={idx} className="text-gray-700">
            {field === "Email" ? "📧" : "📞"} {field}: 
            <span className="font-semibold ml-2">{userData?.[field.toLowerCase()] || "Not provided"}</span>
          </p>
        ))}
      </div>

      {/* Skills Section */}
      <div className="my-5">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {skills.length > 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span className="text-gray-500">No skills available</span>}
        </div>
      </div>

      {/* Resume Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Resume</h2>
        {userData?.profile?.resume ? (
          <a
            target="_blank"
            href={userData.profile.resume}
            className="text-blue-600 underline"
            rel="noopener noreferrer"
          >
            {userData.profile.resumeOriginalName || "Download Resume"}
          </a>
        ) : (
          <span className="text-gray-500">Resume not available</span>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;