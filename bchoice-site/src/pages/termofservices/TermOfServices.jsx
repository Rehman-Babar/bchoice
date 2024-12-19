import React from "react";
import Navbar from "../home/homeComponents/NavBar";
import Navbar2 from "../home/homeComponents/NavBar2";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const TermOfServices = () => {
  const termsData = [
    {
      title: "Overview",
      content: `This website is operated by [Company Name]. Throughout the site, 
      the terms “we”, “us” and “our” refer to [Company Name]...`,
      content2: `This website is operated by [Company Name]. Throughout the site, 
      the terms “we”, “us” and “our” refer to [Company Name]...`,
      content3: `This website is operated by [Company Name]. Throughout the site, 
      the terms “we”, “us” and “our” refer to [Company Name]...`,
    },
    {
      title: "Section 1 - Online Store Terms",
      content: `By agreeing to these Terms of Service, you represent that you are at 
      least the age of majority in your state or province of residence...`,
    },
    {
      title: "Section 2 - General Conditions",
      content: `We reserve the right to refuse service to anyone for any reason at any time...`,
    },
    {
      title: "Section 3 - Accuracy, Completeness, and Timeliness of Information",
      content: `We are not responsible if information made available on this site is not accurate...`,
    },
    // You can add more sections here
  ];
  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="bg-gradient-to-r from-orange-400 to-red-400">
        <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-10">
          <h1 className="text-lg md:text-2xl font-bold text-white">Term of services</h1>
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
                    Term of services
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="px-4 py-8 md:px-12 lg:px-24 xl:px-32">
          <h1 className="text-2xl font-bold text-center mb-8">Terms & Conditions</h1>
          {/* Mapping over termsData to display sections dynamically */}
          {termsData.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed py-2">{section.content}</p>
              <p className="text-gray-700 leading-relaxed py-5">{section.content2}</p>
              <p className="text-gray-700 leading-relaxed pt-5">{section.content3}</p>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermOfServices;
