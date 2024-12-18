import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined, HomeOutlined } from "@mui/icons-material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "state/auth/auth";
import { FaArrowAltCircleLeft, FaHandshake, FaQuestion, FaRegHandshake, FaSteamSquare, FaUserEdit } from "react-icons/fa";
import { MdOutlinePayments, MdPayments, MdSupportAgent, MdVerified } from "react-icons/md";
import { BiSolidHomeHeart } from "react-icons/bi";
import {  RiTeamFill, RiTeamLine } from "react-icons/ri";
import { GiLifeSupport } from "react-icons/gi";
import { FcFaq } from "react-icons/fc";
import { FaFileCircleQuestion } from "react-icons/fa6";
const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const [openDropdown, setOpenDropdown] = useState({});
  const theme = useTheme();
  const { user, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const toggleDropdown = (text) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [text]: !prevState[text],
    }));
  };

  if (!isCheckingAuth && user?.accessRequests?.length === 0) {
    return (
      <Box
      fontFamily={"Poppins, sans-serif, "} 
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          zIndex: 1300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ color: "black", textAlign: "center", marginBottom: "1rem", fontSize: "1rem", fontWeight: "bold" }}>
          Your request is pending approval.
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", textAlign: "center" }}>
          Please wait for the CEO to approve your access.
        </Typography>
        <div className="mt-2 px-3 py-2 bg-gray-300">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </Box>
    );
  }

  return (
    <Box component="nav"
    fontFamily={"Poppins, sans-serif"} 
    >
      {/* Sidebar Drawer for small screens */}
      {!isNonMobile && (
        <Drawer
          open={isSidebarOpen}
          fontFamily={"Poppins, sans-serif"} 
          onClose={() => setIsSidebarOpen(false)}
          variant="temporary"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: "#ffe8eb",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <FlexBetween color={theme.palette.secondary.main}>
              <div className="flex items-center justify-center gap-2 mb-3 mx-auto">
                <img src="/sidebar/Bchoice Final PNG-06-02.png" className="max-w-40 mt-3 mx-auto flex justify-center text-center" alt="" />
              </div>
              <IconButton onClick={() => setIsSidebarOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </FlexBetween>
            <div className="flex items-center px-4 py-1 pb-2 gap-3 mx-auto  ">
              <img 
                src={user.image} 
                alt="User" 
                className="w-12 h-12 rounded-sm object-contain  border-2 border-gray-300" 
              />
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800 -mb-1">{user.fullName}</h3>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            </div>
            <List>
              {/* Add navigation items here */}
              {user?.accessRequests?.map(({ text, icon, items, route }) => {
                const lcText = text.toLowerCase();
                const isActive = active === lcText;

                return (
                  <Box key={text}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          if (route) {
                            navigate(route); // Navigate directly if the item has a route
                          } else if (items) {
                            toggleDropdown(text); // Toggle dropdown for items
                          }
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor: isActive ? "#ffccd3" : "transparent",
                          color: "black",
                          marginTop: "-8px",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "black",
                            transition: "background-color 0.4s ease, color 0.4s ease",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ ml: "0rem", color: isActive ? "black" : "black" }}>
                        {text === "Dashboard" ? <BiSolidHomeHeart /> : null}
                          {text === "All Users" ? <FaUserEdit /> : null}
                          {text === "All Orders" ? <ShoppingCartCheckoutIcon /> : null}
                          {text === "All Products" ? <AddIcon /> : null}
                          {text === "Affiliate Marketing" ? <FaSteamSquare /> : null}
                          {text === "Team" ? <RiTeamFill /> : null}
                          {text === "Payments" ? <MdPayments /> : null}
                          {text === "Faq" ? <FaFileCircleQuestion /> : null}
                          {text === "Supper Support" ? <GiLifeSupport /> : null}
                        </ListItemIcon>
                        <Typography variant="body1"  sx={{ fontWeight: 'bold', ml:"-14px", fontSize: '0.8rem', paddingY: '0.5rem' }}>
                          {text}
                        </Typography>
                        {items && !["Dashboard", "Faq", "Supper Support"].includes(text) && (
                          <ChevronRightOutlined
                            sx={{
                              ml: "auto",
                              transform: openDropdown[text] ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>

                    {/* Dropdown items */}
                    {items && (
                      <Box
                        pl={6}
                        sx={{
                          maxHeight: openDropdown[text] ? "200px" : "0px",
                          overflow: "scroll",
                          transition: "max-height 0.3s ease",
                        }}
                      >
                        {items.map(({ text: subText, route }, index) => (
                          <Link
                            key={subText}
                            to={route}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemButton
                              sx={{
                                pl: 4,
                                color: "black",
                                borderBottom: index === items.length - 1 ? `1px solid ${"#E4C1F9"}` : "none",
                                "&:hover": {
                                  backgroundColor: "#ffccd3",
                                  color: "black",
                                  transition: "background-color 0.3s ease, color 0.3s ease",
                                },
                              }}
                              onClick={() => {
                                setIsSidebarOpen(false);  // Close the sidebar
                              }}
                            >
                              {/* Adjust font size and add spacing */}
                              <Typography variant="body2" sx={{ fontWeight: 'semibold', fontSize: '0.8rem', paddingY: '0.25rem' }}>
                                {subText}
                              </Typography>
                            </ListItemButton>
                          </Link>
))}

                      </Box>
                    )}
                  </Box>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}

      {/* Sidebar Drawer for larger screens */}
      {isNonMobile && (
        <Drawer
        open
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: "#ffe8eb",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* Similar content as for mobile but permanent */}
          <Box width="100%">
            <div className="flex items-end justify-end p-2 text-black">
            <a href="https://bchoice.store/" className="text-end flex items-center gap-1"><FaArrowAltCircleLeft />Back to website</a>
            </div>
            <FlexBetween color={theme.palette.secondary.main}>
              <div className="flex items-center justify-center mx-auto">
                <img src="/sidebar/Bchoice Final PNG-06-02.png" className="max-w-40 mt-1 mx-auto flex justify-center text-center" alt="" />
              </div>
            </FlexBetween>
            <div className="flex items-center px-4 py-1 pb-2 gap-2 mx-auto mt-3">
              <img 
                src={user.image} 
                alt="User" 
                className="w-10 h-10 rounded-sm object-contain border-2 border-gray-300" 
              />
              <div className="flex flex-col">
                <h3 className="text-[12px] font-semibold text-gray-800 flex -mb-1">{user.fullName} <span className="ml-2 mt-0.5"><MdVerified /></span></h3>
                <p className="text-xs text-gray-600">Team</p>
              </div>
            </div>

            <List>
            {user?.accessRequests?.map(({ text, icon, items, route }) => {
              const lcText = text.toLowerCase();
              const isActive = active === lcText;
  return (
    <Box key={text}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            if (route) {
              navigate(route); // Navigate directly if the item has a route
            } else if (items) {
              toggleDropdown(text); // Toggle dropdown for items
            }
            setActive(lcText);
          }}
          sx={{
            backgroundColor: isActive ? "#ffccd3" : "transparent",
            marginTop:"-8px",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              transition: "background-color 0.4s ease, color 0.4s ease",
            },
          }}
        >
          <ListItemIcon sx={{ ml: "-0rem", color: isActive ? "black" : "black" }}>
            {/* Render appropriate icons */}
            {text === "Dashboard" ? <BiSolidHomeHeart /> : null}
            {text === "All Users" ? <FaUserEdit /> : null}
            {text === "All Orders" ? <ShoppingCartCheckoutIcon /> : null}
            {text === "All Products" ? <AddIcon /> : null}
            {text === "Affiliate Marketing" ? <FaSteamSquare /> : null}
            {text === "Team" ? <RiTeamFill /> : null}
            {text === "Payments" ? <MdPayments /> : null}
            {text === "Faq" ? <FaFileCircleQuestion /> : null}
            {text === "Supper Support" ? <GiLifeSupport /> : null}

          </ListItemIcon>
          <Typography variant="body1" sx={{ fontWeight: "bold", ml:"-20px", fontSize: "0.8rem", paddingY: "0.3rem" }}>
            {text}
          </Typography>
          {items && !["Dashboard", "Faq", "Supper Support"].includes(text) && (
  <ChevronRightOutlined
    sx={{
      ml: "auto",
      transform: openDropdown[text] ? "rotate(90deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    }}
  />
)}


        </ListItemButton>
      </ListItem>

      {/* Dropdown items */}
      {items && (
        <Box
          pl={6}
          sx={{
            maxHeight: openDropdown[text] ? "200px" : "0px",
            overflow: "scroll",
            transition: "max-height 0.3s ease",
          }}
        >
          {items.map(({ text: subText, route }, index) => (
            <Link key={subText} to={route} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  pl: 4,
                  color: "black",
                  borderBottom: index === items.length - 1 ? `1px solid ${"#E4C1F9"}` : "none",
                  "&:hover": {
                    backgroundColor: "#ffccd3",
                    color: "black",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  },
                }}
                onClick={() => {
                  setIsSidebarOpen(false); // Close the sidebar
                  setOpenDropdown({}); // Close all dropdowns
                  navigate(route); // Navigate to the route
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "semibold", fontSize: "0.8rem", paddingY: "0.25rem" }}>
                  {subText}
                </Typography>
              </ListItemButton>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
})}

            </List>
            <pre className="absolute bottom-12 flex flex-nowrap bg-[#FFCCD3] text-xs py-2 px-3 text-black text-center">Bchoice - Bservices - Bskills</pre>
            <p className="absolute bottom-1 left-2 p-3 text-black text-center">
            © Bchoice. All Right Reserved.
            </p>
          </Box>
        </Drawer>
      )}

    </Box>
  );
};

export default Sidebar;
