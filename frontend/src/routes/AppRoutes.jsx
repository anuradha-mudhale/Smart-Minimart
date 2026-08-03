import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import MyOrders from "../pages/MyOrders/MyOrders";
import Wishlist from "../pages/Wishlist/Wishlist";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminCoupons from "../pages/Admin/AdminCoupons";

function AppContent() {

  const [search, setSearch] = useState("");

  const location = useLocation();

  // Admin routes check
  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <>
      {/* User Navbar only for non-admin pages */}
      {!isAdminRoute && (
        <Navbar
          search={search}
          setSearch={setSearch}
        />
      )}

      <Routes>

        {/* USER ROUTES */}

        <Route
    path="/"
    element={
        JSON.parse(localStorage.getItem("user"))?.role_id === 1
            ? <Navigate to="/admin" replace />
            : <Home search={search} />
    }
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />
        <Route
            path="/admin/products"
            element={<AdminProducts />}
        />
        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />
        <Route
    path="/admin/coupons"
    element={<AdminCoupons />}
/>

      </Routes>
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default AppRoutes;