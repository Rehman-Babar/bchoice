import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/homeComponents/NavBar";
import Navbar2 from "../home/homeComponents/NavBar2";
import ZoomImage from "../../hook/zoomImg"; // Import the ZoomImage component
import Footer from "../Footer"; // Import the ZoomImage component
import { useSelector } from "react-redux";

const Wishlist = () => {
  const products = [
    // {
    //   id: 1,
    //   image: "/product-banner/6.jpg",
    //   category: "Vegetables",
    //   rating: 4.5,
    //   name: "Fresh organic villa farm lemon 500gm pack",
    //   price: 120.25,
    //   oldPrice: 123.25,
    // },
    // {
    //   id: 7,
    //   image: "/product-banner/6.jpg",
    //   category: "Vegetables",
    //   rating: 4.5,
    //   name: "Fresh organic villa farm lemon 500gm pack",
    //   price: 120.25,
    //   oldPrice: 123.25,
    // },
    // category:
    {
      id: 98,
      image: "/product-banner/6.jpg",
      category: "Vegetables",
      rating: 4.5,
      name: "Fresh organic villa farm lemon 500gm pack",
      price: 120.25,
      oldPrice: 123.25,
    },
    {
      id: 2,
      image: "/product-banner/4.jpg",
      category: "Snacks",
      rating: 5.0,
      name: "Best snacks with hazelnut pack 200gm",
      price: 145,
      oldPrice: 150,
    },
    {
      id: 3,
      image: "/product-banner/5.jpg",
      category: "Fruits",
      rating: 4.5,
      name: "Fresh organic apple 1kg simla marming",
      price: 120.25,
      oldPrice: 123.25,
    },
    {
      id: 4,
      image: "/product-banner/6.jpg",
      category: "Fruits",
      rating: 3.2,
      name: "Organic fresh vanilla farm watermelon 5kg",
      price: 50.3,
      oldPrice: 72.6,
    },
  ];
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  console.log("wishlist", products.category);

  return (
    <div>
      <Navbar />
      <Navbar2 />
      <div className="bg-gradient-to-r from-orange-400 to-red-400">
        <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-20">
          <h1 className="text-lg md:text-2xl font-bold text-white">Wishlist</h1>
          <nav className="flex justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to={"/"}
                  className="inline-flex items-center text-xs md:text-lg font-medium text-white hover:text-blue-600">
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
                    className="rtl:rotate-180 w-3 h-3 text-white mx-1"
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
                    to={"/wishlist"}
                    className="ms-1 text-xs md:text-lg font-medium text-white hover:text-blue-600 md:ms-2">
                    Wishlist
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mb-3 bg-white p-4 md:px-12 flex flex-col items-center max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-md overflow-hidden overflow-y-hidden group border relative">
              <ZoomImage
                src={product.productImage}
                alt={product.productName}
                containerClassName="h-30" // You can customize the height or other styles
                className="group-hover:scale-150" // Optional to customize scaling
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500">{product?.reviews}</span>
                  <span className="ml-2 text-sm text-yellow-500">
                    {[...Array(product.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill"></i>
                    ))}
                    {[...Array(5 - product.rating)].map((_, i) => (
                      <i key={i} className="ri-star-line"></i>
                    ))}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold text-green-600">Rs:{product.price}</span>
                  <span className="text-sm line-through text-gray-400">Rs:{product.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
