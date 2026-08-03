import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const getAllOrders = async (token) => {
    return axios.get(`${API_URL}/admin/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateOrderStatus = async (id, status, token) => {
    return axios.put(
        `${API_URL}/status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};