import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { formatPostDates } from "utils/date";

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8000/client/order/${id}`);
        const data = await res.json();
        if (data.error) {
          toast.error("Internal server error: " + data.error);
          console.log(data.error);
          return;
        }
        setData(data);
      } catch (error) {
        toast.error("Error fetching order details");
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);
  console.log(data?.order_items[0]?.productImage);
  const breadcrumb = useMemo(
    () => (
      <nav className="flex md:px-5 px-1 py-3 text-gray-700" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                to="/orders"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                Orders
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-600 md:ms-2 dark:text-gray-200">Details</span>
            </div>
          </li>
        </ol>
      </nav>
    ),
    []
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div>
      {breadcrumb}
      <div className="border-b border-gray-500 md:px-10 px-2">
        <h1 className="text-lg md:text-3xl font-bold p-5">Order Id: {id}</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="px-5 mt-5 mb-5 text-lg text-gray-400">Order Date: {formatPostDates(data.created_at)}</div>
          <div className="px-5 mt-5 mb-5 text-lg text-gray-400">Total Price: Rs: {data.total_amount}</div>
        </div>
      </div>
      {data.order_items?.map((item) => (
        <div key={item._id} className="p-6 flex flex-col md:flex-row overflow-x-auto justify-between border-b">
          <div className="flex items-center gap-3">
            {/* image */}
            {item.productImage && (
              <img
                className="w-24 h-24 object-cover border-2 rounded-md"
                src={item.productImage}
                alt={item.item_name}
              />
            )}
            <div>{item.item_name}</div>
          </div>
          <div className="flex flex-col gap-2 md:mt-0 mt-4 md:gap-5">
            <p>Rs:{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="flex flex-col md:flex-row justify-between md:px-10 px-2 mt-5">
        <div className="space-y-3">
          <h1 className="text-lg font-bold">Payment Method</h1>
          <div className="text-gray-500">{data.payment_method}</div>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-bold">User Details</h1>
          <div className="text-gray-500">
            Name: {data.firstName} {data.lastName}
          </div>
          <div className="text-gray-500">Email: {data.email}</div>
          <div className="text-gray-500">Phone: {data.phone}</div>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-bold">Delivery</h1>
          <div className="text-gray-500">City: {data.city}</div>
          <div className="text-gray-500">Address: {data.address}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
