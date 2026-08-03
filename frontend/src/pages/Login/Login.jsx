import { useState } from "react";
import "./Login.css";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  // login submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/api/auth/login", formData);

      console.log(response.data);

      // token save
      localStorage.setItem("token", response.data.token);

      // user save
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      window.dispatchEvent(new Event("authChange"));

      alert("Login Successful ✅");

      
if (response.data.user.role_id === 1) {

  navigate("/admin");

}
// Normal User
else {

  navigate("/");
}

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>

        <h2>Login</h2>

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
          Login
        </button>

        <p>
          Don't have account?
          <Link to="/register"> Register</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;