import React, { useState } from "react";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import Footer from "../pages/Footer";
import ScrollingText from "../pages/home/homeComponents/ScrollingText";
import { Link } from "react-router-dom";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle the accordion item based on index
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Accordion items with questions and answers
  const accordionItems = [
    {
      question: "What is Dream Bazar?",
      answer:
        "Dream Bazar is an online marketplace that offers a wide range of products, from electronics and fashion to home decor and more. Our mission is to provide customers with a seamless and enjoyable shopping experience.",
    },
    {
      question: "What types of products do you offer?",
      answer:
        "We offer a diverse selection of products including electronics, fashion, beauty products, home goods, toys, and much more. We partner with various brands to bring you the best choices at competitive prices.",
    },
    {
      question: "How do I track my order?",
      answer:
        "To track your order, visit the 'Track Order' page and enter your order number and email address. You will receive real-time updates on the status of your order, including shipping and delivery details.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it for a refund or exchange. Please ensure the item is in its original condition and packaging. Certain conditions and exceptions may apply.",
    },
    {
      question: "How do I contact customer service?",
      answer:
        "You can contact our customer service team via email, phone, or live chat. Our contact information is available on the 'Contact Us' page. We are here to assist you with any queries or concerns you may have.",
    },
    {
      question: "Is my personal and payment information secure?",
      answer:
        "Yes, we prioritize the security of your personal and payment information. We use industry-standard encryption and secure payment gateways to protect your data during transactions.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. Shipping fees and delivery times vary based on your location. Please check our shipping policy for more detailed information regarding international orders.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary depending on your location and the selected shipping method. Typically, domestic orders take 3-7 business days, while international orders may take 10-20 business days.",
    },
    {
      question: "Can I cancel or change my order?",
      answer:
        "Yes, you can cancel or modify your order within a limited time after placing it. Please contact our customer service as soon as possible if you need to make changes. Once the order has been processed, changes may not be possible.",
    },
  ];

  return (
    <>
      <Navbar />
      <Navbar2 />
      <ScrollingText />

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
                    {"Faq's"}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-16 gap-4 items-center">
        {/* Image Section */}
        <div>
          <img src="/faq/faq.png" alt="FAQ Image" className="w-full  max-h-[600px] object-center" />
        </div>

        {/* Accordion Section */}
        <div className="max-w-2xl mx-auto p-4">
          {accordionItems.map((item, index) => (
            <div key={index} className="border-b">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-3 md:p-4  flex justify-between items-center">
                <span className="font-medium">{item.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-40 md:p-4" : "max-h-0"
                }`}>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Faq;
