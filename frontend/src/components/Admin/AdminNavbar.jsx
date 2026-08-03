import "./AdminNavbar.css";
import { useNavigate } from "react-router-dom";
import {
    FaBell,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";

function AdminNavbar() {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        const confirmLogout =
            window.confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("authChange"));

        navigate("/");
    };

    return (

        <div className="sm-admin-navbar">

            {/* LEFT */}

            <div className="admin-title">

                <h2>Admin Dashboard</h2>

                <p>
                    Welcome back,
                    <strong> {user?.name}</strong>
                </p>

            </div>

            {/* RIGHT */}

            <div className="sm-admin-right">

                <div className="notification">
                    <FaBell />
                </div>

                <div className="admin-profile">

                    <FaUserCircle className="admin-avatar" />

                    <div>

                        <h4>{user?.name}</h4>

                        <p>Administrator</p>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </div>

    );
}

export default AdminNavbar;