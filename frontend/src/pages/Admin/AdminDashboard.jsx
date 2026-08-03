import { useEffect, useState } from "react";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";

import { getDashboardStats } from "../../services/adminService";

import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <AdminNavbar />

                <h1 className="dashboard-title">
                    Dashboard Overview
                </h1>

                {stats && (

                    <div className="dashboard-cards">

                        <div className="dashboard-card orders">
                            <h3>Total Orders</h3>
                            <p>{stats.total_orders}</p>
                        </div>

                        <div className="dashboard-card revenue">
                            <h3>Total Revenue</h3>
                            <p>₹ {stats.total_revenue}</p>
                        </div>

                        <div className="dashboard-card products">
                            <h3>Products</h3>
                            <p>{stats.total_products}</p>
                        </div>

                        <div className="dashboard-card customers">
                            <h3>Customers</h3>
                            <p>{stats.total_customers}</p>
                        </div>

                        <div className="dashboard-card pending">
                            <h3>Pending</h3>
                            <p>{stats.pending_orders}</p>
                        </div>

                        <div className="dashboard-card delivered">
                            <h3>Delivered</h3>
                            <p>{stats.delivered_orders}</p>
                        </div>

                        <div className="dashboard-card cancelled">
                            <h3>Cancelled</h3>
                            <p>{stats.cancelled_orders}</p>
                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminDashboard;