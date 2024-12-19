import { Route, Routes } from "react-router-dom";
import "./App.css";


import HomePage from "./pages/home/HomePage";
import AboutUs from "./pages/about-us/AboutUs";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import Signup from "./Accounts/SignUp";
import LogIn from "./Accounts/Login";
import BlogPage from "./blog/BlogPage";
import Faq from "./faq/Faq";
import Policy from "./policy/policy.jsx";
import TermOfServices from "./pages/termofservices/TermOfServices";
import Reviews from "./reviews/Reviews";
import TopProductCollection from "./TopProductCollection/TopProductCollection";
import CheckOutPage from "./CheckOut/CheckOutPage";
// import CheckoutPage from "./CheckOut/CheckOutPage";
import { Toaster } from "react-hot-toast";
import Loader from "./hook/Loader";
import CustomGift from "./CustomGifts/CustomGift";
import Boxes from "./CustomGifts/Boxes";
import Catagory1 from "./CustomGifts/Catagory1";
import Catagory2 from "./CustomGifts/Catagory2";
import Catagory3 from "./CustomGifts/Catagory3";
import Catagory4 from "./CustomGifts/Catagory4";
import OrderConfirmation from "./CheckOut/OrderConfirmation";



function App() {

  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/blog page" element={<BlogPage />} />
        <Route path="/faq-page" element={<Faq />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/termofservices" element={<TermOfServices />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/top-collection/:id" element={<TopProductCollection />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/order/order confermed" element={<OrderConfirmation />} />
        {/* <Route path="/Loader" element={<Loader />} /> */}
        {/* custom */}
        <Route path="/boxes" element={<Boxes />} />
        <Route path="/boxes/custom-gift" element={<CustomGift />} />
        {/* new */}
        <Route path="/gifts" element={<Catagory1 />} />
        <Route path="/jewellery" element={<Catagory2 />} />
        <Route path="/Chocolate Box & Eatings" element={<Catagory3 />} />
        <Route path="/tech" element={<Catagory4 />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
