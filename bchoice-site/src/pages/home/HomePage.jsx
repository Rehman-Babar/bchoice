/* eslint-disable no-unused-vars */
import React from "react";
// import NavBar from "./homeComponents/NavBar";
// import Navbar from "./homeComponents/NavBar";
// import NavBar2 from "./homeComponents/NavBar2";
import ScrollingText from "./homeComponents/ScrollingText";
// import Carousel from "./homeComponents/App";
// import Categries from "./Categries";
import Categories from "./Categries";
import ProductList from "./ProductList";
import CustomCarousel from "./HiInformationCircle";
import ProductSlider from "./ProductSlider";
import SlaesProduct from "./SlaesProduct";
import TopCollection from "./TopCollection";
import LatestNews from "../LatestNews";
import Footer from "../Footer";
import Reviews from "./Reviews";
import Navbar1 from "./homeComponents/Navbar1";
import Header from "./homeComponents/Header";
import NewHomePage from "./homeComponents/MainHeader";
// import Carousel from "./homeComponents/App.jsx";
// import App from "./homeComponents/App.jsx";
// import Carousel from "./homeComponents/App.jsx";
// /deal/bg-deal-2.jpg

const HomePage = () => {
  return (
    <>
      <Navbar1 />
      <ScrollingText />
      <Header/>
      {/* <Navbar /> */}
      {/* <NavBar2 /> */}
      <NewHomePage/>
      <ProductList />
      <Categories />

      {/* section 5 */}
      <CustomCarousel />
      <ProductSlider />
      <div id="bestdeals"></div>
      <SlaesProduct />
      <TopCollection />
      <LatestNews />
      <Reviews />
      <Footer />
    </>
  );
};

export default HomePage;
