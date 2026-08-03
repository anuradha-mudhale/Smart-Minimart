import "./MyOrders.css";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/api/orders/my-orders",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // GROUP ORDERS

      const grouped = {};

      response.data.forEach((item) => {

        if (!grouped[item.order_id]) {

          grouped[item.order_id] = {

            order_id: item.order_id,

            total_amount: item.total_amount,

            payment_method: item.payment_method,

            status: item.status,

            created_at: item.created_at,

            products: []
          };
        }

        grouped[item.order_id].products.push(item);
      });

      setOrders(Object.values(grouped));

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <div className="orders-page">

      <h2>
        My Orders
      </h2>

      {
        orders.length === 0 ? (

          <h3>
            No Orders Found
          </h3>

        ) : (

          orders.map((order) => (

            <div
              className="bill-card"
              key={order.order_id}
            >

              {/* HEADER */}

              <div className="bill-header">

                <div>

                  <h3>
                    Order #{order.order_id}
                  </h3>

                  <p>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="status">

                  {order.status}

                </div>

              </div>

              {/* PRODUCTS */}

              <table className="bill-table">

                <thead>

                  <tr>

                    <th>Product</th>

                    <th>Qty</th>

                    <th>Price</th>

                    <th>Total</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    order.products.map((product, index) => (

                      <tr key={index}>

                        <td>
                          {product.name}
                        </td>

                        <td>
                          {product.quantity}
                        </td>

                        <td>
                          ₹ {product.price}
                        </td>

                        <td>
                          ₹ {
                            product.price *
                            product.quantity
                          }
                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

              {/* FOOTER */}

              <div className="bill-footer">

                <div>

                  <strong>
                    Payment:
                  </strong>

                  {" "}
                  {order.payment_method}

                </div>

                <div className="grand-total">

                  Grand Total:
                  ₹ {order.total_amount}

                </div>

              </div>

            </div>
          ))
        )
      }

    </div>
  );
}

export default MyOrders;