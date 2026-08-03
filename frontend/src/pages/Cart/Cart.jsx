import "./Cart.css";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaTrash,
  FaArrowLeft
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

function Cart() {

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  // FETCH CART

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setCartItems(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // REMOVE ITEM

  const removeItem = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/cart/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE QUANTITY

  const updateQuantity = async (
    id,
    quantity
  ) => {

    try {

      if (quantity < 1) return;

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/cart/update/${id}`,

        { quantity },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  // GRAND TOTAL

  const grandTotal =
    cartItems.reduce(

      (total, item) =>

        total + Number(item.total),

      0
    );

  // LOADING

  if (loading) {

    return (

      <div className="cart-loading">

        Loading Cart...

      </div>
    );
  }

  // EMPTY CART

  if (cartItems.length === 0) {

    return (

      <div className="empty-cart">

        <h2>
          Your Cart is Empty 🛒
        </h2>

        <button
          className="shop-btn"
          onClick={() =>
            navigate("/")
          }
        >

          Continue Shopping

        </button>

      </div>
    );
  }

  return (

    <div className="cart-page">

      {/* HEADER */}

      <div className="cart-header">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/")
          }
        >

          <FaArrowLeft />

        </button>

        <h2>
          My Cart
        </h2>

      </div>

      {/* TABLE */}

      <div className="table-wrapper">

        <table className="cart-table">

          <thead>

            <tr>

              <th>
                Product
              </th>

              <th>
                Quantity
              </th>

              <th>
                Price
              </th>

              <th>
                Total
              </th>

              <th>
                Delete
              </th>

            </tr>

          </thead>

          <tbody>

            {
              cartItems.map((item) => (

                <tr
                  key={
                    item.cart_item_id
                  }
                >

                  {/* PRODUCT */}

                  <td className="product-cell">

                    <img
                      src={
                        item.image_url
                      }
                      alt={
                        item.name
                      }
                    />

                    <div>

                      <h4>
                        {item.name}
                      </h4>

                    </div>

                  </td>

                  {/* QUANTITY */}

                  <td>

                    <div className="qty-box">

                      <button
                        onClick={() =>

                          updateQuantity(

                            item.cart_item_id,

                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() =>

                          updateQuantity(

                            item.cart_item_id,

                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </td>

                  {/* PRICE */}

                  <td>

                    ₹ {item.price}

                  </td>

                  {/* TOTAL */}

                  <td>

                    ₹ {item.total}

                  </td>

                  {/* DELETE */}

                  <td>

                    <FaTrash
                      className="delete-icon"
                      onClick={() =>

                        removeItem(

                          item.cart_item_id
                        )
                      }
                    />

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

      {/* CHECKOUT */}

      <div className="checkout-section">

        <div className="summary-box">

          <h3>

            Grand Total:

          </h3>

          <h2>

            ₹
            {
              grandTotal.toFixed(2)
            }

          </h2>

        </div>

        <button
          className="checkout-btn"
          onClick={() =>

            navigate("/checkout")
          }
        >

          Proceed To Checkout

        </button>

      </div>

    </div>
  );
}

export default Cart;