import "./Checkout.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaGooglePay,
  FaMoneyBillWave,
  FaShieldAlt,
  FaTag
} from "react-icons/fa";

function Checkout() {

  const token = localStorage.getItem("token");

  const [cartItems, setCartItems] = useState([]);

  const [subtotal, setSubtotal] = useState(0);

  const [deliveryCharge] = useState(40);

  const [discount, setDiscount] = useState(0);

  const [coupon, setCoupon] = useState("");

  const [couponId, setCouponId] = useState(null);

  const [formData, setFormData] = useState({

    name:"",
    mobile:"",
    address:"",
    pincode:"",
    payment:""

  });

  useEffect(()=>{

    fetchCart();

  },[]);

  const fetchCart = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/cart",

        {

          headers:{
            Authorization:`Bearer ${token}`
          }

        }

      );

      setCartItems(res.data);

      let total=0;

      res.data.forEach(item=>{

        total += Number(item.total);

      });

      setSubtotal(total);

    }

    catch(err){

      console.log(err);

    }

  };

  const applyCoupon = async()=>{

    if(!coupon){

      alert("Enter Coupon");

      return;

    }

    try{

      const res = await axios.post(

        "http://localhost:5000/api/coupons/apply",

        {

          code:coupon,
          total:subtotal

        },

        {

          headers:{
            Authorization:`Bearer ${token}`
          }

        }

      );

      setCouponId(res.data.coupon_id);

      setDiscount(Number(res.data.discount));

      alert("Coupon Applied");

    }

    catch(err){

      alert(

        err.response?.data?.message ||

        "Invalid Coupon"

      );

    }

  };

  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };

  const placeOrder = async()=>{

    const{

      name,
      mobile,
      address,
      pincode,
      payment

    }=formData;

    if(

      !name ||
      !mobile ||
      !address ||
      !pincode ||
      !payment

    ){

      alert("Please fill all details");

      return;

    }

    try{

      const res = await axios.post(

        "http://localhost:5000/api/orders/checkout",

        {

          payment_method:payment,

          coupon_id:couponId

        },

        {

          headers:{
            Authorization:`Bearer ${token}`
          }

        }

      );

      alert(res.data.message);

      window.location="/";

    }

    catch(err){

      console.log(err);

      alert("Order Failed");

    }

  };

  const total=subtotal+deliveryCharge-discount;

  return(

<div className="checkout-page">

<div className="checkout-container">

{/* LEFT */}

<div className="checkout-left">

<div className="checkout-header">

<h1>

Checkout

</h1>

<p>

Complete your order securely.

</p>

</div>

<div className="checkout-card">

<h2>

<FaMapMarkerAlt/>

Shipping Address

</h2>

<div className="input-grid">

<div className="input-group">

<label>

Full Name

</label>

<input

type="text"

name="name"

placeholder="Enter Full Name"

value={formData.name}

onChange={handleChange}

/>

</div>

<div className="input-group">

<label>

Mobile Number

</label>

<input

type="text"

name="mobile"

placeholder="Enter Mobile Number"

value={formData.mobile}

onChange={handleChange}

/>

</div>

</div>

<div className="input-group">

<label>

Full Address

</label>

<textarea

rows="4"

name="address"

placeholder="House No, Street, Area"

value={formData.address}

onChange={handleChange}

/>

</div>

<div className="input-group">

<label>

Pincode

</label>

<input

type="text"

name="pincode"

placeholder="Enter Pincode"

value={formData.pincode}

onChange={handleChange}

/>

</div>

</div>

<div className="checkout-card">

<h2>

<FaCreditCard/>

Payment Method

</h2>

<label className="payment-option">

<input

type="radio"

name="payment"

value="UPI"

onChange={handleChange}

/>

<div>

<h4>

<FaGooglePay/>

UPI Payment

</h4>

<p>

Google Pay, PhonePe, Paytm

</p>

</div>

</label>

<label className="payment-option">

<input

type="radio"

name="payment"

value="CARD"

onChange={handleChange}

/>

<div>

<h4>

<FaCreditCard/>

Card Payment

</h4>

<p>

Visa, Mastercard, RuPay

</p>

</div>

</label>

<label className="payment-option">

<input

type="radio"

name="payment"

value="COD"

onChange={handleChange}

/>

<div>

<h4>

<FaMoneyBillWave/>

Cash On Delivery

</h4>

<p>

Pay after delivery

</p>

</div>

</label>

</div>
</div>   {/* checkout-card */}

</div>   {/* checkout-left */}

{/* RIGHT SIDE */}

<div className="checkout-right">

      {/* ================= RIGHT SIDE ================= */}

      <div className="checkout-right">

        <div className="summary-card">

          <h2>Order Summary</h2>

          <div className="cart-items">

            {
              cartItems.length === 0 ?

              <p className="empty-cart">

                Your cart is empty

              </p>

              :

              cartItems.map((item)=>(

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image_url}
                    alt={item.name}
                  />

                  <div className="cart-details">

                    <h4>{item.name}</h4>

                    <p>

                      Qty : {item.quantity}

                    </p>

                  </div>

                  <h4>

                    ₹ {item.total}

                  </h4>

                </div>

              ))

            }

          </div>

          {/* Coupon */}

          <div className="coupon-section">

            <h3>

              <FaTag/>

              Apply Coupon

            </h3>

            <div className="coupon-box">

              <input

                type="text"

                placeholder="Enter Coupon"

                value={coupon}

                onChange={(e)=>setCoupon(e.target.value)}

              />

              <button

                onClick={applyCoupon}

              >

                Apply

              </button>

            </div>

          </div>

          {/* Price Details */}

          <div className="price-details">

            <div className="price-row">

              <span>

                Subtotal

              </span>

              <span>

                ₹ {subtotal.toFixed(2)}

              </span>

            </div>

            <div className="price-row">

              <span>

                Delivery Charge

              </span>

              <span>

                ₹ {deliveryCharge.toFixed(2)}

              </span>

            </div>

            <div className="price-row">

              <span>

                Discount

              </span>

              <span className="discount">

                - ₹ {discount.toFixed(2)}

              </span>

            </div>

            <hr/>

            <div className="price-row total">

              <strong>

                Total Amount

              </strong>

              <strong>

                ₹ {total.toFixed(2)}

              </strong>

            </div>

          </div>

          {/* Secure */}

          <div className="secure-payment">

            <FaShieldAlt/>

            <div>

              <h4>

                Secure Payment

              </h4>

              <p>

                100% encrypted & safe checkout

              </p>

            </div>

          </div>

          {/* Button */}

          <button

            className="place-order-btn"

            onClick={placeOrder}

          >

            Continue to Payment →

          </button>

        </div>

      </div>

    </div>

  </div>

);

}

export default Checkout;