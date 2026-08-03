import { Link } from "react-router-dom";
import "./AdminSidebar.css";


function AdminSidebar() {

    return (

        <div className="blink-sidebar">

            <div className="blink-logo">

                <h1>
                    Smart
                    <span>Minimart</span>
                </h1>

                <p>Admin Panel</p>

            </div>

            <div className="blink-menu">

                <Link to="/admin">
                    📊 Dashboard
                </Link>

                <Link to="/admin/orders">
                    📦 Orders
                </Link>

                <Link to="/admin/products">
                    🛒 Products
                </Link>

                <Link to="/admin/coupons">
                    🎟 Coupons
                </Link>

                <Link to="/admin/users">
                    👥 Users
                </Link>
            </div>

        </div>
    );
}

export default AdminSidebar;