import API from "../api/axios";

export const getDashboardStats = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get(
        "/api/analytics/dashboard",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};