import { useEffect, useState } from "react";
import API from "../../api/axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";

import "./AdminCoupons.css";

function AdminCoupons() {

    const [coupons, setCoupons] = useState([]);

    const [formData, setFormData] = useState({
        code: "",
        discount_type: "PERCENT",
        discount_value: "",
        min_order_value: "",
        expiry_date: ""
    });

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(
                "/api/coupons",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCoupons(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const addCoupon = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.post(
                "/api/coupons",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Coupon Added Successfully ✅");

            setFormData({
                code: "",
                discount_type: "PERCENT",
                discount_value: "",
                min_order_value: "",
                expiry_date: ""
            });

            loadCoupons();

        } catch (err) {

            console.log(err);

        }

    };

    const deleteCoupon = async (id) => {

        if (!window.confirm("Delete Coupon?"))
            return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(
                `/api/coupons/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadCoupons();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <AdminNavbar />

                <h2>Coupon Management</h2>

                <form
                    className="coupon-form"
                    onSubmit={addCoupon}
                >

                    <input
                        type="text"
                        name="code"
                        placeholder="Coupon Code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="discount_type"
                        value={formData.discount_type}
                        onChange={handleChange}
                    >

                        <option value="PERCENT">
                            Percentage
                        </option>

                        <option value="FIXED">
                            Fixed
                        </option>

                    </select>

                    <input
                        type="number"
                        name="discount_value"
                        placeholder="Discount"
                        value={formData.discount_value}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="min_order_value"
                        placeholder="Minimum Order"
                        value={formData.min_order_value}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Add Coupon
                    </button>

                </form>

                <table className="coupon-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Discount</th>
                            <th>Min Order</th>
                            <th>Expiry</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {coupons.map((coupon) => (

                            <tr key={coupon.id}>

                                <td>{coupon.id}</td>

                                <td>{coupon.code}</td>

                                <td>{coupon.discount_type}</td>

                                <td>{coupon.discount_value}</td>

                                <td>{coupon.min_order_value}</td>

                                <td>{coupon.expiry_date}</td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteCoupon(coupon.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminCoupons;