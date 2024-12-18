

import { Add, HomeOutlined, ShoppingCartCheckout } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaBoxes, FaHandshake, FaQuestion, FaTeamspeak, FaUserEdit } from "react-icons/fa";
import { MdBrowserUpdated, MdOutlinePayments, MdSupportAgent } from "react-icons/md";
import { RiContractLine, RiReplyAllFill, RiTeamLine } from "react-icons/ri";
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    route: "/dashboard",
  },
  {
    text: "All Users",
    icon: <FaUserEdit />,
    items: [
      { text: "All Users", icon: <FaUserEdit />, route: "/all users" },
      { text: "Buyers", icon: <FaUserEdit />, route: "/buyers" },
      { text: "Sellers", icon: <FaUserEdit />, route: "/Seller Users" },
    ],
  },
  {
    text: "All Orders",
    icon: <ShoppingCartCheckout />,
    items: [
      {
        text: "All Orders",
        icon: <ShoppingCartCheckout />,
        route: "/orders",
      },
      {
        text: "New Arrivals",
        icon: <ShoppingCartCheckout />,
        route: "/new arrivals",
      },
      {
        text: "Customize Gifts",
        icon: <ShoppingCartCheckout />,
        route: "/custom gift",
      },
    ],
  },
  {
    text: "All Products",
    icon: <Add />,
    items: [
      { text: "All Products", icon: <Add />, route: "/list/all products" },
      { text: "Custom Gift", icon: <Add />, route: "/list/custom gifts" },
      { text: "New Arrival", icon: <Add />, route: "/productspage" },
      { text: "Best Seller", icon: <Add />, route: "/productspage/bestseller" },
    ],
  },
  {
    text: "Affiliate Marketing",
    icon: <FaHandshake />,
    items: [
      {
        text: "New Orders",
        icon: <FaHandshake />,
        route: "/affilate/marketer/team/reporting",
      },
      {
        text: "Replacement",
        icon: <RiReplyAllFill />,
        route: "/affilate/marketer/team/reporting/replacement",
      },
      { text: "BC Support", icon: <FaHandshake />, route: "/affilate/marketer/team/reporting complaient" },
      { text: "All Products", icon: <FaBoxes />, route: "/affilate/marketer/team/reporting all products" },
      { text: "Daily Update", icon: <MdBrowserUpdated />, route: "/affilate/marketer/team/reporting/daily update" },
      { text: "Term & Conditions ", icon: <RiContractLine  />, route: "/affilate/marketer/team/reporting/term & conditions" },
    ]
  },
  {
    text:"Team",
    icon: <RiTeamLine />,
    items: [
      { text: "Advertising", icon:<FaTeamspeak/>, route: "/advertising" },
    ]
  },
  {
    text: "Payments",
    icon: <MdOutlinePayments />,
    items: [
      {
        text: "Withdraw",
        icon: <MdOutlinePayments />,
        route: "/seller/team/payments/withdraw",
      },
      { text: "Payment History", icon: <MdOutlinePayments />, route: "/seller/team/payments/withdraw history" },
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

// Component start
const NavItemsPage = ({ user, handleDel, closeModal, fetchUsers }) => {
  const [selectedItems, setSelectedItems] = useState({});

  // Initialize selectedItems based on user.accessRequests
  useEffect(() => {
    if (user && user.accessRequests) {
      const initialSelected = {};

      user.accessRequests.forEach((item) => {
        initialSelected[item.text] = {
          selected: true,
          route: item.route,
          items: {},
        };

        if (item.items) {
          item.items.forEach((subItem) => {
            initialSelected[item.text].items[subItem.text] = {
              text: subItem.text,
              route: subItem.route,
            };
          });
        }
      });

      setSelectedItems(initialSelected);
    }
  }, [user]);

  // Handle the checkbox change event
  const handleCheckboxChange = (text, subText = null, route = null) => {
    setSelectedItems((prev) => {
      const newState = { ...prev };

      if (subText) {
        if (!newState[text]) {
          newState[text] = { selected: true, route, items: {} };
        }

        newState[text].items[subText] = newState[text].items[subText]
          ? undefined
          : { text: subText, route };

        if (!newState[text].items[subText]) {
          delete newState[text].items[subText];
        }
      } else {
        if (newState[text]?.selected) {
          delete newState[text];
        } else {
          // Select the main item and all its sub-items
          newState[text] = { selected: true, route, items: {} };
          const navItem = navItems.find((item) => item.text === text);

          if (navItem?.items) {
            navItem.items.forEach((subItem) => {
              newState[text].items[subItem.text] = {
                text: subItem.text,
                route: subItem.route,
              };
            });
          }
        }
      }

      return newState;
    });
  };

  // Generate the selected array for submission
  const generateSelectedArray = async () => {
    if (!user || !user._id) {
      toast.error("User ID is missing");
      return;
    }

    const result = navItems
      .filter((item) => selectedItems[item.text])
      .map((item) => ({
        text: item.text,
        route: selectedItems[item.text].selected ? item.route : null,
        icon: item.icon, // Include the main icon
        items: item.items
          ? item.items
              .filter((subItem) => selectedItems[item.text]?.items[subItem.text])
              .map((subItem) => ({
                text: subItem.text,
                route: subItem.route,
                icon: subItem.icon, // Include sub-item icons
              }))
          : [],
      }));

    console.log("Selected items:", result);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v2/auth/seller/admin/update/request/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessRequests: result }),
        }
      );

      if (response.ok) {
        fetchUsers();
        toast.success("Updated successfully");
        closeModal();
      } else {
        console.log("Failed to update:", response.status);
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      toast.error("Error sending data to backend");
    }
  };

  return (
    <div className="p-8 mt-2 bg-[#FCF9FE]">
      <h1 className="text-xl font-bold mb-4">Navigation Items</h1>
      <div className="grid grid-cols-2 ">
        {navItems.map(({ text, icon, items, route }) => (
          <div key={text} className="mb-6 pb-3 border-b-2">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedItems[text]?.selected || false}
                onChange={() => handleCheckboxChange(text, null, route)}
                className="h-3 w-3 cursor-pointer"
              />
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm">{text}</span>
              </div>
            </div>
            {items && (
              <div className="pl-8 mt-2 space-y-2">
                {items.map(({ text: subText, route: subRoute, icon: subIcon }) => (
                  <div key={subText} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={!!selectedItems[text]?.items[subText]}
                      onChange={() => handleCheckboxChange(text, subText, subRoute)}
                      className={`h-3 w-3 cursor-pointer ${
                        selectedItems[text]?.items[subText]
                          ? "bg-[#FCD8E1] border-[#FCD8E1]"
                          : "bg-gray-200 border-gray-300"
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      {subIcon}
                      <span className="text-sm">{subText}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={generateSelectedArray}
          className="bg-[#A95FB8] hover:bg-[#FCD8E1] hover:text-pink-600 text-white px-4 py-2 rounded mt-4"
        >
          {user.accessApproved ? "Activated" : "Active"}
        </button>
        <button
          onClick={() => handleDel(user._id)}
          className="bg-[#A95FB8] hover:bg-gray-400 text-white px-4 py-2 rounded mt-4"
        >
          Block
        </button>
      </div>
    </div>
  );
};

export default NavItemsPage;

