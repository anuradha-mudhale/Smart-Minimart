import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";

import "./AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= FETCH USERS =================

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    // ================= DEACTIVATE USER =================

    const deactivateUser = async (id) => {

        const ok = window.confirm(
            "Are you sure you want to deactivate this user?"
        );

        if (!ok) return;

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/users/deactivate/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("User deactivated successfully ✅");

            fetchUsers();

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Failed to deactivate user"
            );

        }

    };

    // ================= SEARCH =================

    const filteredUsers = users.filter((user) => {

        const text = search.toLowerCase();

        return (

            user.name?.toLowerCase().includes(text) ||

            user.email?.toLowerCase().includes(text) ||

            user.role?.toLowerCase().includes(text) ||

            String(user.id).includes(text)

        );

    });

    // ================= STATS =================

    const totalUsers = users.length;

    const totalAdmins =
        users.filter(
            u => u.role === "ADMIN"
        ).length;

    const totalCustomers =
        users.filter(
            u => u.role === "USER"
        ).length;

    const activeUsers =
        users.filter(
            u => u.is_active === 1
        ).length;

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <AdminNavbar />

                <div className="users-header">

                    <div>

                        <h2>Users Management</h2>

                        <p>
                            Manage all registered users
                        </p>

                    </div>

                </div>

                <div className="user-stats">

                    <div className="stat-card">
                        <h3>{totalUsers}</h3>
                        <span>Total Users</span>
                    </div>

                    <div className="stat-card blue">
                        <h3>{totalAdmins}</h3>
                        <span>Admins</span>
                    </div>

                    <div className="stat-card green">
                        <h3>{totalCustomers}</h3>
                        <span>Customers</span>
                    </div>

                    <div className="stat-card orange">
                        <h3>{activeUsers}</h3>
                        <span>Active Users</span>
                    </div>

                </div>

                <div className="search-container">

                    <input
                        type="text"
                        placeholder="Search user..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <table className="users-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <span
                                        className={
                                            user.role === "ADMIN"
                                                ? "role-admin"
                                                : "role-user"
                                        }
                                    >
                                        {user.role}
                                    </span>

                                </td>

                                <td>

                                    {user.is_active ? (

                                        <span className="active">
                                            Active
                                        </span>

                                    ) : (

                                        <span className="inactive">
                                            Inactive
                                        </span>

                                    )}

                                </td>

                                <td>

                                    {user.role === "ADMIN" ? (

                                        <button
                                            className="protected-btn"
                                        >
                                            Protected
                                        </button>

                                    ) : (

                                        <button
                                            className="deactivate-btn"
                                            onClick={() =>
                                                deactivateUser(user.id)
                                            }
                                        >
                                            Deactivate
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminUsers;