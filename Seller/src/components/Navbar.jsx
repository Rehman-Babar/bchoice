import React, { useState } from "react";
import { Menu as MenuIcon, Search, ArrowDropDownOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "state/auth/auth";
import { TiThMenu } from "react-icons/ti";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, Growth }) => {
  const dispatch = useDispatch();
  const { user, isLoggingOut } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="lg:bg-[#e4c1f91a] shadow-none w-full  border-2 border-b-black  font-urbanist sans-serif  fontFamily">
      <div className="flex justify-between items-center lg:p-2 p-2">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 ">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 sm:hidden text-2xl">
          <TiThMenu />
          </button>
          <div className="items-center lg:flex gap-1">
          <div className="flex flex-col items-start justify-center">
            
          </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center gap-6">
        <IoIosNotifications className="text-2xl" />
          <div className="flex  items-center gap-1">
            <button
              onClick={handleClick}

              className="flex items-center gap-4 text-left"
            >
              <div className="flex items-center justify-center gap-1">
              <img
                alt="User"
                src={user.image}
                className="h-8 w-8 rounded-sm object-contain bg-gray-700"
              />
              <div className="hidden lg:block">
                <p className="text-xs text-gray-600">{user.fullName}</p>
              </div>
              <ArrowDropDownOutlined className="text-gray-500 text-lg" />
              </div>
            </button>

            {isOpen && (
              
              <div
                className="absolute right-4 mt-9 w-48 bg-white border-gray-800 rounded-sm shadow-lg border"
                onMouseLeave={handleClose}
              >
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-gray-800"
                >
                  {isLoggingOut ? "Log Out..." : "Log Out"}
                </button>
                <Link to="/profile.pak"
                  className="w-full px-4 py-2 pb-2  text-left text-gray-800 "
                >
                  Profile
                </Link>
              </div>
              
              
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
