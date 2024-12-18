import React, { useState } from "react";
import { FaEye, FaTruck, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const TeamProgress = () => {
  // Fake data for orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      dp: "https://via.placeholder.com/40",
      userName: "John Doe",
      status: "Active",
      email: "john.doe@example.com",
      growth: "10%",
      cpo: "2.5",
      ads: 5,
      msgs: 12,
      allOrders: 30,
      booked: 10,
      delivered: 15,
      returned: 5,
      personalBalance: "$100",
      withdraw: "$50",
      pendingWithdraw: "$10",
    },
    {
      id: 2,
      dp: "https://via.placeholder.com/40",
      userName: "Jane Smith",
      status: "Inactive",
      email: "jane.smith@example.com",
      growth: "15%",
      cpo: "3.0",
      ads: 3,
      msgs: 8,
      allOrders: 25,
      booked: 8,
      delivered: 12,
      returned: 5,
      personalBalance: "$80",
      withdraw: "$30",
      pendingWithdraw: "$20",
    },
  ]);

  return (
    <div className="lg:p-4 p-2">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-semibold">Affiliate Orders ({orders.length})</p>
        </div>
      </div>
      <div className="overflow-auto h-full">
        {orders.length > 0 ? (
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-[#FCF9FE] text-[8px] lg:text-[12px]">
                <th className="lg:p-2 p-1 text-left border border-gray-300">Sr#</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300">Dp</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">UserName</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Status</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Email</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Growth</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Cpo</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Ads</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300">Msgs</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 ">All Orders</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Booked</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300">Delivered</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300">Returned</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Personal Balance</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300">Withdraw</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Pending Withdraw</th>
                <th className="lg:p-2 p-1 text-left border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="text-[8px] lg:text-[12px]">
                  <td className="lg:p-2 p-1 border border-gray-300">{index + 1}</td>
                  <td className="lg:p-2 p-1 border border-gray-300">
                    <img src={order.dp} alt="DP" className="w-6 h-6 lg:w-10 lg:h-10 rounded-full" />
                  </td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.userName}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.status}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.email}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.growth}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.cpo}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.ads}</td>
                  <td className="lg:p-2 p-1 border border-gray-300">{order.msgs}</td>
                  <td className="lg:p-2 p-1 border border-gray-300">{order.allOrders}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.booked}</td>
                  <td className="lg:p-2 p-1 border border-gray-300">{order.delivered}</td>
                  <td className="lg:p-2 p-1 border border-gray-300">{order.returned}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.personalBalance}</td>
                  <td className="lg:p-2 p-1 border border-gray-300">{order.withdraw}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.pendingWithdraw}</td>
                  <td className="lg:p-2 p-1 border border-gray-300 flex space-x-1">
                    <button className="text-blue-500">
                      <FaEye />
                    </button>
                    <button className="text-green-500">
                      <FaEdit />
                    </button>
                    <button className="text-red-500">
                      <MdDeleteSweep />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4 text-gray-600">
            You currently have no orders.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamProgress;
