import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaShoppingCart,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./Wishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH WISHLIST =================

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlistItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ================= REMOVE =================

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
      alert("Failed to remove product");
    }
  };

  // ================= MOVE TO CART =================

  const moveToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product_id: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await removeFromWishlist(productId);

      alert("Product moved to cart successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to move product");
    }
  };

  // ================= EMPTY WISHLIST =================

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">

        <div className="wishlist-header">
          <h1>
            <FaHeart className="heart-icon" />
            My Wishlist
          </h1>
        </div>

        <div className="empty-box">

          <FaHeart className="empty-heart" />

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favourite products here and buy them later.
          </p>

          <button
            className="shop-btn"
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="wishlist-page">

      {/* Header */}

      <div className="wishlist-header">

        {/* <h1>
          <FaHeart className="heart-icon" />
          My Wishlist
        </h1> */}

        <span className="item-count">
          {wishlistItems.length} Item(s)
        </span>

      </div>

      {/* Wishlist */}

      <div className="wishlist-list">

        {wishlistItems.map((item) => (

          <div className="wishlist-card" key={item.id}>

            {/* Image */}

            <div className="image-section">

              <img
                src={item.image_url}
                alt={item.name}
                className="wishlist-image"
              />

            </div>

            {/* Details */}

            <div className="details-section">

              <h2>{item.name}</h2>

              <h3>
                ₹ {Number(item.price).toFixed(2)}
              </h3>

              <div className="stock">

                <FaCheckCircle />

                <span>In Stock</span>

              </div>

              <p className="description">
                High quality grocery product available at the
                best price.
              </p>

            </div>

            {/* Buttons */}

            <div className="action-section">

              <button
                className="cart-btn"
                onClick={() => moveToCart(item.id)}
              >
                <FaShoppingCart />
                Move To Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                <FaTrashAlt />
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Wishlist;