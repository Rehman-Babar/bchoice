/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";

import { FaBoxOpen,  FaCheckCircle, FaExclamationCircle, FaUndo,  FaMoneyBillWave, FaHandHoldingUsd, FaCashRegister, FaShippingFast, FaChartLine, FaFileInvoiceDollar, FaRegSadCry, FaTimesCircle, FaTag, FaTags, FaPercentage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TbCirclePercentageFilled } from "react-icons/tb";

import { fetchOrders } from "state/ordersData/GetOrderHook";
import {fetchAffilateOrders, filterOrders } from "state/AffilateOrder/ordersForAffilate";import { fetchPaymentHistory } from "state/payment/history";
import { IoIosWarning } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "components/Navbar";
import { AiFillDashboard } from "react-icons/ai";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Open by default
  const [selectedItem, setSelectedItem] = useState('This Month'); // State to store selected item
  const [invetments, setInvetments] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // orders for personal ballance 

  const {  totalPendingWithdrawal, totalWithdrawn } = useSelector((state) => state.paymentHistory);
  const orders = useSelector((state) => state.affilateorders.filteredData);
  const { totalPersonalBalance } = useSelector(
    (state) => state.affilateorders
  );
  const handleItemClick = (filter) => {
    setSelectedItem(filter);
    setIsDropdownOpen(false);

    dispatch(filterOrders(filter));
  };
  
  const fetchInvetments = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v8/invest/seller/investment/${user._id}`
        );
        setInvetments(response.data);
        setLoading(false);
    } catch (err) {
        toast.error(err.message || "Something went wrong");
        setLoading(false);
    }
};
// console.log("invetments",invetments)

  useEffect(() => {
    if (user?._id) {
      // Fetch orders when the dashboard is mounted
      dispatch(fetchAffilateOrders(user?._id));
      dispatch(fetchPaymentHistory(user._id));
      
    }
  }, [dispatch, user]);

  useEffect(() => {
    fetchInvetments();
}, []);
  

  // Toggle dropdown when button is clicked
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Fetch all orders from Redux
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);


  // const ordersData = useSelector(selectAllOrders);
  const [activeFilter, setActiveFilter] = useState("all");

  // Calculate order counts by status from ordersData array only if it exists
  const totalOrders = orders?.length || 0;
  const dispatchedOrders = orders?.filter(order => order.status === "Dispatched")?.length || 0;
  const deliveredOrders = orders?.filter(order => order.status === "Delivered")?.length || 0;
  const issuedOrders = orders?.filter(order => order.status === "Issued")?.length || 0;
  const isPaid = orders?.filter(order => order.paidOrNot === "Paid")?.length || 0;
  const isUnPaid = orders?.filter(order => order.paidOrNot === "Unpaid")?.length || 0;
  const returnedOrders = orders?.filter(order => order.status === "Returned")?.length || 0;
  const isBooked = orders?.filter(order => order.status === "Booked")?.length || 0;
  const totalInvestments = invetments?.reduce((sum, invest) => sum + (invest.investmentAmount || 0), 0) || 0;
  const cpo = totalOrders > 0 ? Math.round(totalInvestments / totalOrders) : 0;
  const Growth = Math.floor(totalOrders > 0 ? ((225 - cpo) / 225) * 100 : 0);
  

  

  // Define data for cards based on the ac,tive filter
  const data = {
    all: [
      
      { 
        label: "Personal Balance", 
        value: `PKR.${totalPersonalBalance}`, 
        icon: <FaMoneyBillWave />, 
        
        iconBgColor: "bg-[#D4F8D4]", // Soft light green background
        iconColor: "text-[#2D9F6E]"  // Deep green for the icon, representing financial stability
      }  ,    
        { 
          label: "Pending Widraw", 
          value: `PKR.${totalPendingWithdrawal}`, 
          icon: <FaHandHoldingUsd />, 
          month: "Sep", 
          iconBgColor: "bg-[#D3F0FC]", // Light blue
          iconColor: "text-[#026C9A]"  // Dark blue
        },
        { 
          label: "Total Widraw", 
          value: `PKR.${totalWithdrawn}`, 
          icon: <FaCashRegister />, 
          month: "Sep", 
          iconBgColor: "bg-[#F3E7FC]", // Light purple
          iconColor: "text-[#8C29A9]"  // Dark purple
        },
        { 
          label: "CPO", 
          value: `PKR.${cpo}`, 
          icon: <FaTags />,  // A tags icon to represent offers or products
          
          iconBgColor: "bg-[#FFF3E0]", // Light orange background, warm and welcoming
          iconColor: "text-[#FF6F00]"  // Dark orange icon for energy and attention
        },             
        { 
          label: "Booked", 
          value: isBooked, 
          icon: <FaUndo />, 
          iconBgColor: "bg-[#FFF9D6]", // Light yellow
          iconColor: "text-[#A88705]"  // Dark yellow
        },
        { 
          label: "Dispatched", 
          value: dispatchedOrders, 
          icon: <FaShippingFast />,  // A shipping fast icon to indicate speed and delivery
          
          iconBgColor: "bg-[#E1F5FE]", // Light cyan background for a fresh feel
          iconColor: "text-[#0288D1]"  // Dark blue icon for professionalism and trust
        },        
        { 
          label: "Issued", 
          value: issuedOrders, 
          icon: <FaExclamationCircle />, 
          iconBgColor: "bg-[#FFD9E4]", // Light pink
          iconColor: "text-[#A50034]"  // Dark red
        },
        { 
          label: "Delivered", 
          value: deliveredOrders, 
          icon: <FaCheckCircle />, 
          iconBgColor: "bg-[#F3E7FC]", // Light purple
          iconColor: "text-[#8C29A9]"  // Dark purple
        },
        { 
          label: "Returned", 
          value: returnedOrders, 
          icon: <IoIosWarning />, 
          iconBgColor: "bg-[#FFCCCC]", // Light red
          iconColor: "text-[#D80000]"  // Dark red
        },
        
        { 
          label: "Total Orders", 
          value: totalOrders, 
          icon: <FaBoxOpen />, 
          
          iconBgColor: "bg-[#D1F2EB]", // Light teal
          iconColor: "text-[#1ABC9C]"  // Strong teal
        },        
        { 
          label: "Paid Orders", 
          value: isPaid, 
          icon: <FaCheckCircle />, 
          
          iconBgColor: "bg-[#E0F7FA]", // Soft teal background
          iconColor: "text-[#00796B]"   // Dark teal icon color for a sense of reliability and completion
        },        
        { 
          label: "UnPaid Orders", 
          value: isUnPaid, 
          icon: <FaTimesCircle />, 
          
          iconBgColor: "bg-[#F9E0E0]", // Light red/pink background
          iconColor: "text-[#D9534F]"  // Strong red for the icon (indicating warning)
        },    
        { 
          label: "Growth", 
          value: `${Growth} %` , 
          icon: <TbCirclePercentageFilled />, 
          
          iconBgColor: "bg-[#A3D9A5]", // Soft green background
          iconColor: "text-[#4CAF50]"  // Darker green for the icon
        }    
    ],
    // Other filter sections remain unchanged
  };

  // Function to render cards based on the active filter
  const renderCards = () => {
    return data[activeFilter].map((item, index) => (
      <div key={index} className={`lg:px-4 lg:py-5 px-1 py-2  border lg:h-24 h-16  flex items-center space-x- justify-center md:justify-between ${item.color}`}>
        <div className="flex items-center justify-center gap-3">
          <div className={`p-3 rounded-full ${item.iconBgColor} bg-opacity-50`}>
            <div className={`lg:text-4xl text-sm ${item.iconColor}`}>{item.icon}</div>
          </div>
          <div>
            <span className="lg:text-2xl text-xs font-bold">{item.value}</span>
            <p className="lg:text-lg text-[7px] text-gray-700 font-semibold">{item.label}</p>
            {item.subtitle && <p className="text-xs text-gray-500 hidden lg:block mt-1">{item.subtitle}</p>}
          </div>
        </div>
      </div>
    ));
  };

  return (
<Box m="0.1rem 0rem" overflow={"hidden"} fontFamily={"Urbanist, sans-serif"} >
  
  <div className="lg:p-2 p-2">
  <header className="flex justify-between items-center mb-3">
  <p className="lg:text-lg ml-2 text-[7px] hidden lg:block absolute top-3">
  Your Performance Going{" "}
  <span
    className={`${
      Growth >= 55
        ? "text-purple-500" // Super 🎉🤩
        : Growth >= 33
        ? "text-green-600" // Excellent 😍
        : Growth >= 0
        ? "text-blue-500" // Very Good 😊
        : Growth >= -28
        ? "text-yellow-500" // Good 🥰
        : Growth >= -55
        ? "text-gray-500" // Little Good 🤔
        : Growth >= -100
        ? "text-orange-500" // Poor 🥵
        : Growth >= -166
        ? "text-red-500" // Very Poor 🤬
        : Growth >= -3000
        ? "text-black" // Worst 😱
        : "text-gray-500" // Default fallback
    }`}
  >
    {Growth >= 55
      ? "Super 🎉🤩"
      : Growth >= 33
      ? "Excellent 😍"
      : Growth >= 0
      ? "Very Good 😊"
      : Growth >= -28
      ? "Good 🥰"
      : Growth >= -55
      ? "Little Good 🤔"
      : Growth >= -100
      ? "Poor 🥵"
      : Growth >= -166
      ? "Very Poor 🤬"
      : Growth >= -3000
      ? "Worst 😱"
      : "🤔"}
  </span>
</p>
<p className="lg:text-lg text-[7px] lg:hidden">
  Your Performance Going{" "}
  <span
    className={`${
      Growth >= 55
        ? "text-purple-500" // Super 🎉🤩
        : Growth >= 33
        ? "text-green-600" // Excellent 😍
        : Growth >= 0
        ? "text-blue-500" // Very Good 😊
        : Growth >= -28
        ? "text-yellow-500" // Good 🥰
        : Growth >= -55
        ? "text-gray-500" // Little Good 🤔
        : Growth >= -100
        ? "text-orange-500" // Poor 🥵
        : Growth >= -166
        ? "text-red-500" // Very Poor 🤬
        : Growth >= -3000
        ? "text-black" // Worst 😱
        : "text-gray-500" // Default fallback
    }`}
  >
    {Growth >= 55
      ? "Super 🎉🤩"
      : Growth >= 33
      ? "Excellent 😍"
      : Growth >= 0
      ? "Very Good 😊"
      : Growth >= -28
      ? "Good 🥰"
      : Growth >= -55
      ? "Little Good 🤔"
      : Growth >= -100
      ? "Poor 🥵"
      : Growth >= -166
      ? "Very Poor 🤬"
      : Growth >= -3000
      ? "Worst 😱"
      : "🤔"}
  </span>
</p>

<p className="hidden lg:flex items-center text-lg font-bold gap-2">Dashboard <AiFillDashboard/></p>

{/* <!-- Dropdown menu --> */}
<div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center px-4 py-2 text-sm text-black rounded focus:ring-4 focus:ring-blue-300"
        >
          {selectedItem}
          <svg
            className={`w-3 h-3 ml-2 transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 right-2 w-36 bg-white rounded shadow">
            <ul className="p-2 space-y-1 text-sm text-black">
              {[
                "All Time",
                "Today",
                "Yesterday",
                "This Week",
                "Last Week",
                "This Month",
                "Last Month",
                "This Year",
                "Last Year",
              ].map((item) => (
                <li key={item}>
                  <div
                    onClick={() => handleItemClick(item)}
                    className="flex items-center p-1 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="ml-2 font-medium">{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
</header>


    {/* Render order data-dependent cards only if ordersData is populated */}
    {orders ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-2 gap-1">{renderCards()}</div>
    ) : (
      <p>Loading order data...</p>
    )}
  </div>

  {/* Additional content - Responsive Grid Layout for Charts and Other Sections */}

</Box>

  );
};

export default Dashboard;

