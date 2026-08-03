import { useState } from "react";
import "./Register.css";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // register submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/api/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>

        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

        <p>
          Already have account?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Register;