import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../../redux/authSlice";

const USER_API_END = "http://localhost:9001/api/v1/user";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout failed. Try again.");
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-12 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        </ul>

        {/* Authentication UI */}
        <div className="flex items-center gap-5">
          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user.profilePhoto && user.profilePhoto !== "default_profile.jpg"
                        ? user.profilePhoto // Use the Cloudinary URL directly
                        : "https://github.com/shadcn.png" // Fallback avatar
                    }
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage
                      src={
                        user.profilePhoto && user.profilePhoto !== "default_profile.jpg"
                          ? user.profilePhoto // Use the Cloudinary URL directly
                          : "https://github.com/shadcn.png" // Fallback avatar
                      }
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname || "User"}</h4>
                    <p className="text-sm text-muted-foreground">{user.email || "user@example.com"}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="link">
                    <Link to="/profile">View Profile</Link>
                  </Button>
                  <Button variant="link" onClick={logoutHandler}>Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;