import "./ProductCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {

  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // =========================
  // PRODUCT CLICK
  // =========================
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // =========================
  // CHECK WISHLIST
  // =========================
  useEffect(() => {

    const checkWishlist = async () => {

      try {

        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/wishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const exists = res.data.some(
          (item) => item.id === product.id
        );

        setLiked(exists);

      } catch (err) {

        console.log(err);

      }

    };

    checkWishlist();

  }, [product.id, token]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (e) => {

    e.stopPropagation();

    try {

      if (!token) {

        alert("Please login first");
        return;

      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product_id: product.id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update Navbar Cart Count
      window.dispatchEvent(new Event("cartUpdated"));

      alert(response.data.message);

    } catch (error) {

      console.log(error);
      alert("Failed to add to cart");

    }

  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = async (e) => {

    e.stopPropagation();

    try {

      if (!token) {

        alert("Please login first");
        return;

      }

      if (!liked) {

        await axios.post(
          "http://localhost:5000/api/wishlist/add",
          {
            product_id: product.id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setLiked(true);

      } else {

        await axios.delete(
          `http://localhost:5000/api/wishlist/remove/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setLiked(false);

      }

      // Update Navbar Wishlist Count
      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (error) {

      console.log(error);
      alert("Wishlist action failed");

    }

  };

  return (

    <div
      className="product-card"
      onClick={handleProductClick}
    >

      {/* Wishlist */}

      <div
        className="wishlist-icon"
        onClick={handleWishlist}
      >

        {
          liked
            ? <FaHeart className="heart liked" />
            : <FaRegHeart className="heart" />
        }

      </div>

      {/* Image */}

      <img
        src={
          product.image_url ||
          "https://via.placeholder.com/200"
        }
        alt={product.name}
      />

      {/* Name */}

      <h3>{product.name}</h3>

      {/* Description */}

      <p className="description">

        {
          product.description
            ? `${product.description.slice(0, 60)}...`
            : "No description available"
        }

      </p>

      {/* Price */}

      <h4>₹ {product.price}</h4>

      {/* Stock */}

      <p className="stock">
        Stock : {product.stock}
      </p>

      {/* Button */}

      <button onClick={handleAddToCart}>
        Add To Cart 🛒
      </button>

    </div>

  );

}

export default ProductCard;