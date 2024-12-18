import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { FaBoxOpen, FaHourglassHalf, FaTruck, FaTimes, FaCheckCircle, FaExclamationCircle, FaUndo, FaUsers, FaMoneyBillWave, FaHandHoldingUsd, FaCashRegister, FaShippingFast, FaChartLine, FaFileInvoiceDollar, FaRegSadCry } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, selectAllOrders } from "state/ordersData/getOrdersForDashboard";
import { fetchOrders } from "state/ordersData/GetOrderHook";

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // Fetch all orders from Redux
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const allOrders = useSelector((state) => state.orders.orders);

  // Fetch all orders when the component mounts


  // Access orders data from Redux store
  // const ordersData = useSelector(selectAllOrders);
  const [activeFilter, setActiveFilter] = useState("all");

  // Define color mapping
  const colors = {
    all: "#CDB4DB",
    orders: "#FFC8DD",
    amounts: "#FFAFCC",
    team: "#BDE0FE",
  };

  // Calculate order counts by status from ordersData array only if it exists
  const totalOrders = allOrders?.length || 0;
  const inProgressOrders = allOrders?.filter(order => order.status === "InProgress").length || 0;
  const dispatchedOrders = allOrders?.filter(order => order.status === "Dispatched").length || 0;
  const cancelledOrders = allOrders?.filter(order => order.status === "Cancelled").length || 0;
  const deliveredOrders = allOrders?.filter(order => order.status === "Delivered").length || 0;
  const issuedOrders = allOrders?.filter(order => order.status === "Issued").length || 0;
  const returnedOrders = allOrders?.filter(order => order.status === "Returned").length || 0;

  // Define data for cards based on the active filter
  const data = {
    all: [
      { label: "Total Orders", value: totalOrders, icon: <FaBoxOpen />, iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
      { label: "InProgress", value: inProgressOrders, icon: <FaHourglassHalf />, iconBgColor: "bg-[#FCF6BD]", iconColor: "text-[#A88705]" },
      { label: "Dispatched", value: dispatchedOrders, icon: <FaTruck />, iconBgColor: "bg-[#D0F4DE]", iconColor: "text-[#088D46]" },
      { label: "Cancelled", value: cancelledOrders, icon: <FaTimes />, iconBgColor: "bg-[#A9DEF9]", iconColor: "text-[#026C9A]" },
      { label: "Delivered", value: deliveredOrders, icon: <FaCheckCircle />, iconBgColor: "bg-[#E4C1F9]", iconColor: "text-[#8C29A9]" },
      { label: "Issued", value: issuedOrders, icon: <FaExclamationCircle />, iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
      { label: "Returned", value: returnedOrders, icon: <FaUndo />, iconBgColor: "bg-[#FCF6BD]", iconColor: "text-[#A88705]" },
      { label: "Visitors", value: "456", icon: <FaUsers />, month: "Jan", iconBgColor: "bg-[#D0F4DE]", iconColor: "text-[#088D46]" },
      { label: "Total Amount", value: "Rs 34,565", icon: <FaMoneyBillWave />, month: "Jan", iconBgColor: "bg-[#A9DEF9]", iconColor: "text-[#026C9A]" },
      { label: "Advance Payment", value: "Rs 33,777", icon: <FaHandHoldingUsd />, month: "Sep", iconBgColor: "bg-[#E4C1F9]", iconColor: "text-[#8C29A9]" },
      { label: "COD Amount", value: "Rs 45,556", icon: <FaCashRegister />, month: "Sep", iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
      { label: "DC Charges", value: "777", icon: <FaShippingFast />, month: "Jan", iconBgColor: "bg-[#FCF6BD]", iconColor: "text-[#A88705]" },
      { label: "Revenues", value: "Rs 15,000", icon: <FaChartLine />, month: "Jan", iconBgColor: "bg-[#D0F4DE]", iconColor: "text-[#088D46]" },
      { label: "Expenses", value: "Rs 13,999", icon: <FaFileInvoiceDollar />, month: "Mar", iconBgColor: "bg-[#A9DEF9]", iconColor: "text-[#026C9A]" },
      { label: "Profit", value: "Rs 12,676", icon: <FaHandHoldingUsd />, month: "Jan", iconBgColor: "bg-[#E4C1F9]", iconColor: "text-[#8C29A9]" },
      { label: "Loss", value: "Rs 3,999", icon: <FaRegSadCry />, month: "Jan", iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
    ],
    // Other filter sections remain unchanged
    orders: [
      { label: "Total Orders", value: totalOrders, icon: <FaBoxOpen />, month: "Jan", iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
      { label: "InProgress", value: inProgressOrders, icon: <FaHourglassHalf />, month: "Mar", iconBgColor: "bg-[#FCF6BD]", iconColor: "text-[#A88705]" },
      { label: "Dispatched", value: dispatchedOrders, icon: <FaTruck />, month: "Sep", iconBgColor: "bg-[#D0F4DE]", iconColor: "text-[#088D46]" },
      { label: "Cancelled", value: cancelledOrders, icon: <FaTimes />, month: "Jan", iconBgColor: "bg-[#A9DEF9]", iconColor: "text-[#026C9A]" },
      { label: "Delivered", value: deliveredOrders, icon: <FaCheckCircle />, month: "Jan", iconBgColor: "bg-[#E4C1F9]", iconColor: "text-[#8C29A9]" },
      { label: "Issued", value: issuedOrders, icon: <FaExclamationCircle />, month: "Mar", subtitle: "24 Issues Solved", iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
      { label: "Returned", value: returnedOrders, icon: <FaUndo />, month: "Sep", subtitle: "23 Successfully Re-Attempted", iconBgColor: "bg-[#FCF6BD]", iconColor: "text-[#A88705]" },
    ],
    amounts: [
      { label: "Total Amount", value: "Rs 34,565", icon: <FaMoneyBillWave />, month: "Jan", iconBgColor: "bg-[#D0F4DE]", iconColor: "text-[#088D46]" },
      { label: "Advance Payment", value: "Rs 33,777", icon: <FaHandHoldingUsd />, month: "Sep", iconBgColor: "bg-[#A9DEF9]", iconColor: "text-[#026C9A]" },
      { label: "COD Amount", value: "Rs 45,556", icon: <FaCashRegister />, month: "Sep", iconBgColor: "bg-[#E4C1F9]", iconColor: "text-[#8C29A9]" },
      { label: "DC Charges", value: "777", icon: <FaShippingFast />, month: "Jan", iconBgColor: "bg-[#FF99C8]", iconColor: "text-[#A50034]" },
    ],
    team: [
      { label: "Revenues", value: "Rs 15,000", icon: <FaChartLine />, month: "Jan", iconBgColor: "bg-[#FCF6BD]", iconColor: "text-[#A88705]" },
      { label: "Expenses", value: "Rs 13,999", icon: <FaFileInvoiceDollar />, month: "Mar", iconBgColor: "bg-[#D0F4DE]", iconColor: "text-[#088D46]" },
      { label: "Profit", value: "Rs 12,676", icon: <FaHandHoldingUsd />, month: "Jan", iconBgColor: "bg-[#A9DEF9]", iconColor: "text-[#026C9A]" },
      { label: "Loss", value: "Rs 3,999", icon: <FaRegSadCry />, month: "Jan", iconBgColor: "bg-[#E4C1F9]", iconColor: "text-[#8C29A9]" },
    ],
  };

  // Function to render cards based on the active filter
  const renderCards = () => {
    return data[activeFilter].map((item, index) => (
      <div key={index} className={`lg:px-4 lg:py-5 px-1 py-2  border lg:h-24 h-20 shadow-lg flex items-center justify-between ${item.color}`}>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${item.iconBgColor} bg-opacity-50`}>
            <div className={`lg:text-4xl text-sm ${item.iconColor}`}>{item.icon}</div>
          </div>
          <div>
            <span className="lg:text-2xl text-xs font-bold">{item.value}</span>
            <p className="lg:text-lg text-[10px] text-gray-700 font-semibold">{item.label}</p>
            {item.subtitle && <p className="text-xs text-gray-500 hidden lg:block mt-1">{item.subtitle}</p>}
          </div>
        </div>
        <span className="text-xs text-gray-600">{item.month}</span>
      </div>
    ));
  };

  return (
<Box m="1rem 0.2rem">
  <div className="lg:p-6 p-2">
  <header className="flex flex-col md:flex-row justify-between items-center mb-3">
  <div className="flex lg:space-x-4 space-x-2">
    {["all", "orders", "amounts", "team"].map((filter) => (
      <button
        key={filter}
        onClick={() => setActiveFilter(filter)}
        className={`px-3 py-1 md:px-7 md:py-2 text-sm md:text-base rounded-sm ${
          activeFilter === filter ? `${colors[filter]} text-white` : "bg-gray-200 text-gray-700"
        }`}
        style={{ backgroundColor: activeFilter === filter ? colors[filter] : "#E5E7EB" }}
      >
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </button>
    ))}
  </div>
</header>


    {/* Render order data-dependent cards only if ordersData is populated */}
    {allOrders && allOrders.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-2">{renderCards()}</div>
    ) : (
      <p>Loading order data...</p>
    )}
  </div>

  {/* Additional content - Responsive Grid Layout for Charts and Other Sections */}
  <Box mt="20px" display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="160px" gap="20px" sx={{ "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" } }}>
    <Box
      gridColumn="span 8"
      gridRow="span 2"
      backgroundColor={theme.palette.background.alt}
      p="1rem"
      borderRadius="0.55rem"
      sx={{
        // Responsive adjustments for the chart
        "@media (max-width: 1200px)": {
          gridColumn: "span 12", // On smaller screens, take full width
        },
      }}
    >
      <OverviewChart view="sales" isDashboard={true} />
    </Box>
  </Box>
</Box>

  );
};

export default Dashboard;

