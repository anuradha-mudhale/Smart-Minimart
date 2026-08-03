import axios from "axios";

const API = "http://localhost:5000/api/wishlist";

// 📥 GET WISHLIST
export const getWishlist = (token) => {
    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// ❌ REMOVE FROM WISHLIST
export const removeFromWishlist = (product_id, token) => {
    return axios.delete(
        `${API}/remove/${product_id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};