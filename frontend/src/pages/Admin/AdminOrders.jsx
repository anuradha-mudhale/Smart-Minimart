import { useEffect, useState } from "react";
import API from "../../api/axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";

import "./AdminOrders.css";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(
                "/api/orders/admin/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/api/orders/status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadOrders();

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <AdminNavbar />

                <h2 className="orders-title">
                    Orders Management
                </h2>

                <table className="orders-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.name}</td>

                                <td>₹ {order.total_amount}</td>

                                <td>{order.payment_method}</td>

                                <td>

                                    <span
                                        className={`status ${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>

                                </td>

                                <td>

                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                order.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="PENDING">
                                            PENDING
                                        </option>

                                        <option value="DELIVERED">
                                            DELIVERED
                                        </option>

                                        <option value="CANCELLED">
                                            CANCELLED
                                        </option>

                                    </select>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminOrders;