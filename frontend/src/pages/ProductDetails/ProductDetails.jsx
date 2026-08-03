import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH PRODUCT DETAILS
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        const productData = Array.isArray(res.data)
          ? res.data[0]
          : res.data;

        setProduct(productData);
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart");
    }
  };

  // =========================
  // ADD TO WISHLIST
  // =========================
  const handleAddToWishlist = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to add to wishlist");
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading...
      </h2>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================
  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Product not found
      </h2>
    );
  }

  return (
    <div className="product-details">
      {/* IMAGE SECTION */}
      <div className="product-image">
        <img
          src={
            product.image_url ||
            "https://via.placeholder.com/400"
          }
          alt={product.name}
        />
      </div>

      {/* INFO SECTION */}
      <div className="product-info">
        <h2>{product.name}</h2>

        <p className="price">
          ₹ {product.price}
        </p>

        <p className="desc">
          {product.description || "No description available"}
        </p>

        <p className="stock">
          Stock: {product.stock}
        </p>

        {/* BUTTONS */}
        <div className="product-actions">
          <button
            className="btn-cart"
            onClick={handleAddToCart}
          >
            Add to Cart 🛒
          </button>

          <button
            className="btn-wishlist"
            onClick={handleAddToWishlist}
          >
            Add to Wishlist ❤️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;