import React from "react";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: "Best guide to Shopping for Organic ingredients.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod...",
      image: "/blog/4.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Best guide to Shopping for Organic ingredients.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod...",
      image: "/blog/5.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      title: "Best guide to Shopping for Organic ingredients.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod...",
      image: "/blog/6.jpg", // Replace with actual image URL
    },
    {
      id: 4,
      title: "Best guide to Shopping for Organic ingredients.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod...",
      image: "/blog/7.jpg", // Replace with actual image URL
    },
    {
      id: 5,
      title: "Best guide to Shopping for Organic ingredients.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod...",
      image: "/blog/4.jpg", // Replace with actual image URL
    },
    {
      id: 6,
      title: "Best guide to Shopping for Organic ingredients.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod...",
      image: "/blog/5.jpg", // Replace with actual image URL
    },
  ];
  return (
    <>
      <Navbar />
      <Navbar2 />

      <div className="bg-gradient-to-r from-orange-400 to-red-400">
        <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-20">
          <h1 className="text-lg md:text-2xl font-bold text-white">Blog</h1>
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
                    to={"/blog"}
                    className="ms-1 text-xs md:text-lg font-medium text-white hover:text-blue-600 md:ms-2">
                    Blog
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:px-16 lg:px-24 mt-16 max-w-[1550px] mb-8">
        {articles.map((article) => (
          <div key={article.id} className="relative overflow-hidden bg-white rounded-lg shadow-md border">
            <div className="p-4">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.description}</p>
              <a href="#" className="text-green-500 hover:underline mt-2 block">
                READ MORE &rarr;
              </a>
            </div>
            <img
              src={article.image}
              alt={article.title}
              className="h-48 w-full object-cover rounded-b-lg hover:scale-110"
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
