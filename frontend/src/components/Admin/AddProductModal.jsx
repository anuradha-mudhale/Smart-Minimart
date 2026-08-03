import { useState, useEffect } from "react";
import API from "../../api/axios";

import "./AddProductModal.css";

function AddProductModal({
    closeModal,
    loadProducts,
    product
}) {

    const [formData, setFormData] = useState({

        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        category_id: ""

    });

    // ================= LOAD PRODUCT DATA FOR EDIT =================
    useEffect(() => {

        if (product) {

            setFormData({

                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                stock: product.stock || "",
                image_url: product.image_url || "",
                category_id: product.category_id || ""

            });

        }

    }, [product]);

    // ================= INPUT CHANGE =================
    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    // ================= SAVE / UPDATE =================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            if (product) {

                // UPDATE PRODUCT
                await API.put(
                    `/api/products/${product.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Product Updated Successfully ✅");

            } else {

                // ADD PRODUCT
                await API.post(
                    "/api/products/add",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Product Added Successfully ✅");

            }

            loadProducts();

            closeModal();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong ❌"
            );

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>
                    {product ? "Edit Product" : "Add Product"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="image_url"
                        placeholder="Image URL"
                        value={formData.image_url}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="category_id"
                        placeholder="Category ID"
                        value={formData.category_id}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "15px"
                        }}
                    >

                        <button type="submit">

                            {product ? "Update Product" : "Save Product"}

                        </button>

                        <button
                            type="button"
                            onClick={closeModal}
                            style={{
                                background: "#999",
                                color: "#fff",
                                cursor: "pointer"
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default AddProductModal;