import React, { useState } from "react";
import { Menu as MenuIcon, Search, ArrowDropDownOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "state/auth/auth";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
    <nav className="bg-[#ffe8eb] shadow-none w-full">
      <div className="flex justify-between items-center p-2">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            <MenuIcon />
          </button>
          <div className="flex items-center">
          <div className="relative rounded-lg w-full lg:w-64 overflow-hidden  before:absolute before:w-12 before:h-10    before:rounded-full before:blur-lg  after:absolute after:-z-10 after:w-20 after:h-20 after:content['']   after:top-3 after:rounded-full after:blur-lg">
          <input placeholder="Search..." className="relative bg-transparent ring-0 outline-none border border-[#ff4560]  placeholder-gary-800 text-sm rounded-lg  placeholder-opacity-60  block w-full lg:p-2.5 p-1.5 " type="text"/>
          </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleClick}
              className="flex items-center gap-4 text-left"
            >
              <img
                alt="User"
                src={user.image}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-xs text-gray-600">{user.username}</p>
              </div>
              <ArrowDropDownOutlined className="text-gray-500 text-lg" />
            </button>

            {isOpen && (
              <div
                className="absolute right-4 mt-2 w-48 bg-white border rounded-lg shadow-lg"
                onMouseLeave={handleClose}
              >
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
                >
                  {isLoggingOut ? "Log Out..." : "Log Out"}
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <LogoutIcon onClick={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
