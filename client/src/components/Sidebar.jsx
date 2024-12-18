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
import { FaBoxes, FaHandshake, FaQuestion, FaRegHandshake, FaRegUser, FaUserEdit } from "react-icons/fa";
import { MdBrowserUpdated, MdOutlinePayments, MdSupportAgent } from "react-icons/md";
// IoSettingsOutline
import { IoSettingsOutline } from "react-icons/io5";
import { RiContractLine, RiReplyAllFill, RiTeamLine } from "react-icons/ri";


const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
      route: "/dashboard",
    },
    {
      text: "General",
      icon: <IoSettingsOutline />,
      items: [
        { text: "Bchoice Settings", route: "/bchoice settings" },
        { text: "Buyers Settings", route: "/buyers settings" },
        { text: "Sellers Settings", route: "/sellers settings" },
      ],
    },
    {
      text: "All Users",
      icon: <FaRegUser />,
      items: [
        { text: "All Users", route: "/all users" },
        { text: "Buyers", route: "/buyers" },
        { text: "Affiliates", route: "/Seller Users" },
      ],
    },
    {
      text: "All Orders",
      icon: <ShoppingCartCheckoutIcon />,
      items: [
        { text: "All Orders", route: "/orders" },
        { text: "New Arrivals", route: "/new arrivals" },
        { text: "Customize Gifts", route: "/custom gift" },
      ],
    },
    {
      text: "All Products",
      icon: <AddIcon />,
      items: [
        { text: "All Products", route: "/list/all products" },
        { text: "Custom Gift", route: "/list/custom gifts" },
        { text: "New Arrival", route: "/productspage" },
        { text: "Best Seller", route: "/productspage/bestseller" },
      ],
    },
    {
      text: "Management",
      icon: <AddIcon />,
      items: [
        { text: "Revenues", route: "/revenues" },
        { text: "Expenses", route: "/expenses" },
        { text: "All Team", route: "/all-team" },
        { text: "Tasks", route: "/tasks" },
      ],
    },
    {
      text: "Affiliate Marketing",
      icon: <FaRegHandshake />,
      items: [
        {
          text: "New Orders",
          icon: <FaHandshake />,
          route: "/affilate/marketer/team/reporting",
        },
        { text: "BC Support", icon: <FaHandshake />, route: "/affilate/marketer/team/reporting complaient" },
        {
          text: "Replacement",
          icon: <RiReplyAllFill />,
          route: "/affilate/marketer/team/reporting/replacement",
        },
        { text: "All Products", icon: <FaBoxes />, route: "/affilate/marketer/team/reporting all products" },
        { text: "Daily Update", icon: <MdBrowserUpdated />, route: "/affilate/marketer/team/reporting/daily update" },
        { text: "Term & Conditions ", icon: <RiContractLine  />, route: "/affilate/marketer/team/reporting/term & conditions" },
      ],
    },
    {
      text:"Team",
      icon: <RiTeamLine />,
      items: [
        { text: "Advertising", route: "/advertising" },
        { text: "Progress", route: "/progress/team" },
      ]
    },
    {
      text: "Payments",
      icon: <MdOutlinePayments />,
      items: [
        {
          text: "Panding Withdraw",
          icon: <FaHandshake />,
          route: "/seller/team/payments/withdraw",
        },
        { text: "Payment History", icon: <FaHandshake />, route: "/payments/withdraw history" },
      ],
    },
    {
      text: "Supper Support",
      icon: <MdSupportAgent />,
      route: "/supper/support",
    },
    {
      text: "Faq",
      icon: <FaQuestion />,
      route: "/faq/question",
    },
    
  ];
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

  if (!isCheckingAuth && navItems.length === 0) {
    return (
      <Box
      fontFamily={"Urbanist, sans-serif"} 
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
    fontFamily={"Urbanist, sans-serif"} 
    >
      {/* Sidebar Drawer for small screens */}
      {!isNonMobile && (
        <Drawer
          open={isSidebarOpen}
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
              <div className="flex items-center justify-center gap-2 mx-auto">
                <img src="/sidebar/Bchoice Final PNG-06-02.png" className="max-w-40 mt-3 mx-auto flex justify-center text-center" alt="" />
              </div>
              <IconButton onClick={() => setIsSidebarOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </FlexBetween>
            <List>
              {/* Add navigation items here */}
              {navItems.map(({ text, icon, items, route }) => {
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
                          "&:hover": {
                            backgroundColor: "white",
                            color: "black",
                            transition: "background-color 0.4s ease, color 0.4s ease",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ ml: "0rem", color: isActive ? "black" : "black" }}>
                          {icon}
                        </ListItemIcon>
                        <Typography variant="body1"  sx={{ fontWeight: 'bold', ml:"-20px", fontSize: '0.8rem', paddingY: '0.3rem' }}>
                          {text}
                        </Typography>
                        {items && (
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
                        {items.map(({ text: subText, route, }, index) => (
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
                                  backgroundColor: "#FCD8E1",
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
            <FlexBetween color={theme.palette.secondary.main}>
              <div className="flex items-center justify-center mx-auto">
                <img src="/sidebar/Bchoice Final PNG-06-02.png" className="max-w-40 mt-3 mx-auto flex justify-center text-center" alt="" />
              </div>
            </FlexBetween>
            <List>
            {navItems.map(({ text, icon, items, route }) => {
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
                                      "&:hover": {
                                        backgroundColor: "white",
                                        color: "black",
                                        transition: "background-color 0.4s ease, color 0.4s ease",
                                      },
                                    }}
                                  >
                                    <ListItemIcon sx={{ ml: "0rem", color: isActive ? "black" : "black" }}>
                                      {icon}
                                    </ListItemIcon>
                                    <Typography variant="body1" sx={{ fontWeight: "bold",  ml:"-20px", fontSize: '0.8rem', paddingY: "0.3rem" }}>
                                      {text}
                                    </Typography>
                                    {items && (
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
                                              backgroundColor: "#FCD8E1",
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
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
