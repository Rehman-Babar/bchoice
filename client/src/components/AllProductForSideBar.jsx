import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "All Products",
    icon: <AddIcon />,
  },
  {
    text: "All Orders",
    icon: <ShoppingCartCheckoutIcon />,
  },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget); // Open dropdown
  };

  const handleDropdownClose = () => {
    setAnchorEl(null); // Close dropdown
  };

  const handleMenuItemClick = (route) => {
    navigate(`/${route.toLowerCase()}`);
    setActive(route.toLowerCase());
    setAnchorEl(null); // Close dropdown after selection
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    BSERVICES
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}

              {/* Dropdown Menu Item */}
              <ListItem disablePadding>
                <ListItemButton onClick={handleDropdownClick}>
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                      color: theme.palette.secondary[200],
                    }}
                  >
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Products" />
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                </ListItemButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleDropdownClose}
                  sx={{
                    mt: "45px",
                    "& .MuiPaper-root": {
                      backgroundColor: "transparent", // Transparent background
                      boxShadow: "none", // Remove shadow if needed
                      width: anchorEl ? anchorEl.offsetWidth : "auto", // Match the width of "All Products" button
                    },
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick("Custom Gift")}>
                    Custom Gift
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("New Arrival")}>
                    New Arrival
                  </MenuItem>
                </Menu>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
