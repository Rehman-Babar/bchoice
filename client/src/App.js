import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
// import Products from "scenes/products";
// import Customers from "scenes/customers";
// import Transactions from "scenes/transactions";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";
import ProductPage from "scenes/products/ProductPage";
import AddProductPage from "scenes/products/AddNewProducts";
import { Toaster } from "react-hot-toast";
import GetOrder from "scenes/order/GetOrder";
import OrderDetails from "scenes/order/OrderDetails";
// import AddProductsToBestSelling from "scenes/products/AddProductsToBestSelling";
import CustomGifts from "scenes/products/CustomGifts";
// import OrderFirstPage from "scenes/order/OrderFirstPage.jsx/OrderFirstPage";
import GetOrderForNewArrival from "scenes/order/GetOrderForNewArrival";
import GetOrderForCustomGift from "scenes/order/OrderFirstPage.jsx/GetOrdersForCustomGigt";
import BestSellerProducts from "scenes/products/GettingBesstSeller";
import GettingCustomGift from "scenes/products/GettingCustomGift";
import SignUp from "scenes/auth/SignUp";
import Login from "scenes/auth/Login";
import { authCheck } from "state/auth/auth";
import AllProducts from "scenes/products/AllProducts";
import NotFoundPage from "components/NotFoundPage";
import AllUsers from "scenes/users/AllUsers";
import SellerUsers from "scenes/users/Seller";
import AffilateTeam from "scenes/affilate-markiting/AffilateMarkiting";
import BCSupport from "scenes/affilate-markiting/BCSupport";
import SellerSettings from "scenes/genral/SellerSettings";
import BuyerSettings from "scenes/genral/BuyerSettings";
import BchoiceSettings from "scenes/genral/BchoiceSettings";
import SupperSupport from "scenes/supper-support/SupperSupport";
import DailyUpdate from "scenes/affilate-markiting/DailyUpdate";
import Replysment from "scenes/affilate-markiting/Replysment";
import TermsAndCondition from "scenes/affilate-markiting/TermsAndCondition";
import FaqPage from "scenes/affilate-markiting/FaqPage";
import PaymentHistoryPage from "scenes/payments/WidraHistory";
import PandingWidraw from "scenes/payments/Widraw";
import AllProductsForSellers from "scenes/affilate-markiting/AllProductsForSellers";
import Advertising from "scenes/team/Advertising";
import TeamProgress from "scenes/team/TeamProgress";
// import NotFoundPage from "components/NotFoundPage.jsx";
// import NotFoundPage from "scenes/notFound/NotFoundPage";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Redirect authenticated users to dashboard from login/signup */}
            <Route
              path="signup"
              element={user ? <Navigate to="/dashboard" replace /> : <SignUp />}
            />
            <Route
              path="login"
              element={user ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              element={
                <ProtectedRoute user={user}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/all users" element={<AllUsers />} />
              <Route path="/Seller Users" element={<SellerUsers />} />
              {/* <Route path="/products" element={<Products />} /> */}
              <Route path="/productspage" element={<ProductPage />} />
              <Route path="/productspage/bestseller" element={<BestSellerProducts />} />
              <Route path="/addproducts" element={<AddProductPage />} />
              <Route path="/custom-gifts" element={<CustomGifts />} />
              <Route path="/list/custom gifts" element={<GettingCustomGift />} />
              <Route path="/new arrivals" element={<GetOrderForNewArrival />} />
              <Route path="/custom gift" element={<GetOrderForCustomGift />} />
              <Route path="/list/all products" element={<AllProducts />} />
              <Route path="/orders" element={<GetOrder />} />
              <Route path="/order/:id" element={<OrderDetails />} />

              <Route path="/affilate/marketer/team/reporting" element={<AffilateTeam />} />
              <Route path="/affilate/marketer/team/reporting complaient" element={<BCSupport />} />
              <Route path="/affilate/marketer/team/reporting/daily update" element={<DailyUpdate />} />
              <Route path="/affilate/marketer/team/reporting all products" element={<AllProductsForSellers />} />
              <Route path="/affilate/marketer/team/reporting/replacement" element={<Replysment />} />
              <Route path="/affilate/marketer/team/reporting/term & conditions" element={<TermsAndCondition />} />
              <Route path="/bchoice settings" element={<BchoiceSettings />} />
              <Route path="/buyers settings" element={<BuyerSettings />} />
              <Route path="/sellers settings" element={<SellerSettings />} />
              <Route path="/supper/support" element={<SupperSupport />} />
              <Route path="/faq/question" element={<FaqPage />} />
              <Route path="/seller/team/payments/withdraw" element={<PandingWidraw />} />
              <Route path="/payments/withdraw history" element={<PaymentHistoryPage />} />
              <Route path="/progress/team" element={<TeamProgress />} />
              {/* Catch-all route for Page Not Found */}
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/advertising" element={<Advertising />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;

