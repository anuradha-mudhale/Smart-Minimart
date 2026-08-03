import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Banner from "../../components/Banner/Banner";
import ProductCard from "../../components/ProductCard/ProductCard";
import API from "../../api/axios";

import "./Home.css";

function Home({ search }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await API.get("/api/products/all");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER PRODUCTS
  const filterProducts = async (categoryId) => {
    try {
      const response = await API.get(`/api/products/filter?category_id=${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH PRODUCTS
  const searchProducts = async (keyword) => {
    try {
      const response = await API.get(`/api/products/search?keyword=${keyword}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD
  useEffect(() => {
    if (search.trim() !== "") {
      searchProducts(search);
    } else if (selectedCategory) {
      filterProducts(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [search, selectedCategory]);

  return (
    <div className="home-container">
      {/* SIDEBAR */}
      <Sidebar setSelectedCategory={setSelectedCategory} />

      {/* MAIN */}
      <div className="main-content">
        {/* Banner */}
        <Banner />

        {/* Products Section */}
        <h2 className="section-title">Recommended Products</h2>

        <div id="products" className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h3>No Products Found ❌</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
