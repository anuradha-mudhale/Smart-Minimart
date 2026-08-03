import "./Navbar.css";

import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUserCircle,
  FaBoxOpen,
  FaSignOutAlt
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar({ search, setSearch }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const token = localStorage.getItem("token");

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ==========================
  // FETCH CART COUNT
  // ==========================
  const fetchCartCount = async () => {

    try {

      if (!token) {

        setCartCount(0);
        return;

      }

      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartCount(res.data.length);

    } catch (err) {

      console.log(err);

    }
  };

  // ==========================
  // FETCH WISHLIST COUNT
  // ==========================
  const fetchWishlistCount = async () => {

    try {

      if (!token) {

        setWishlistCount(0);
        return;

      }

      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      

      setWishlistCount(res.data.length);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchCartCount();
    fetchWishlistCount();

    const handleAuthChange = () => {

      setUser(
        JSON.parse(localStorage.getItem("user"))
      );

      fetchCartCount();
      fetchWishlistCount();

    };

    const handleWishlistUpdate = () => {

      fetchWishlistCount();

    };

    const handleCartUpdate = () => {

  console.log("Cart update event received");

  fetchCartCount();

};

    window.addEventListener(
      "authChange",
      handleAuthChange
    );

    window.addEventListener(
      "wishlistUpdated",
      handleWishlistUpdate
    );

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {

      window.removeEventListener(
        "authChange",
        handleAuthChange
      );

      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdate
      );

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );

    };

  }, []);


  return (

    <div className="navbar">

      {/* LOGO */}

      <Link to="/" className="logo-link">
        <h2 className="logo">
          Smart Minimart
        </h2>
      </Link>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button>
          <FaSearch />
        </button>

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        {/* WISHLIST */}

        <Link
          to="/wishlist"
          className="icon-container"
        >

          <FaHeart className="nav-icon" />

          {wishlistCount > 0 && (

            <span className="badge">

              {wishlistCount}

            </span>

          )}

        </Link>

        {/* CART */}

        <Link
          to="/cart"
          className="icon-container"
        >

          <FaShoppingCart className="nav-icon" />

          {cartCount > 0 && (

            <span className="badge">

              {cartCount}

            </span>

          )}

        </Link>

        {/* USER */}

        {user ? (

          <div className="profile-menu">

            <div className="profile-icon">
              <FaUserCircle />
            </div>

            <div className="dropdown">

              <div className="user-name">

                Hello,
                <br />

                <strong>
                  {user.name}
                </strong>

              </div>

              <Link
                to="/my-orders"
                className="dropdown-link"
              >

                <div className="dropdown-item">

                  <FaBoxOpen />

                  My Orders

                </div>

              </Link>

              <div
                className="dropdown-item logout"
                onClick={() => {

                  localStorage.removeItem("token");
                  localStorage.removeItem("user");

                  setUser(null);

                  setCartCount(0);
                  setWishlistCount(0);

                  window.dispatchEvent(
                    new Event("authChange")
                  );

                  navigate("/");

                }}
              >

                <FaSignOutAlt />

                Logout

              </div>

            </div>

          </div>

        ) : (

          <div className="auth-buttons">

            <Link to="/login">

              <button className="auth-btn">

                Login

              </button>

            </Link>

            <Link to="/register">

              <button className="auth-btn register-btn">

                Register

              </button>

            </Link>

          </div>

        )}

      </div>

    </div>

  );
}

export default Navbar;