import { useEffect, useState } from "react";
import API from "../../api/axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AddProductModal from "../../components/Admin/AddProductModal";

import "./AdminProducts.css";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // ⭐ Selected product for Edit
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    // ================= LOAD PRODUCTS =================
    const loadProducts = async () => {

        try {

            const res = await API.get("/api/products/all");

            setProducts(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    // ================= DELETE PRODUCT =================
    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(
                `/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product Deleted Successfully ✅");

            loadProducts();

        } catch (error) {

            console.log(error);

            alert("Failed To Delete Product ❌");

        }
    };

    // ================= EDIT PRODUCT =================
    const editProduct = (product) => {

        setSelectedProduct(product);

        setShowModal(true);

    };

    // ================= ADD PRODUCT =================
    const addProduct = () => {

        setSelectedProduct(null);

        setShowModal(true);

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <AdminNavbar />

                <div className="product-header">

                    <h2>Products Management</h2>

                    <button
                        className="add-btn"
                        onClick={addProduct}
                    >
                        + Add Product
                    </button>

                </div>

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr key={product.id}>

                                <td>{product.id}</td>

                                <td>

                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="product-img"
                                    />

                                </td>

                                <td>{product.name}</td>

                                <td>₹ {product.price}</td>

                                <td>{product.stock}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => editProduct(product)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {showModal && (

                    <AddProductModal
                        product={selectedProduct}
                        loadProducts={loadProducts}
                        closeModal={() => setShowModal(false)}
                    />

                )}

            </div>

        </div>

    );
}

export default AdminProducts;