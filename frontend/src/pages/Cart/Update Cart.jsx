const updateQuantity = async (
  id,
  quantity
) => {

  try {

    if (quantity < 1) return;

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/cart/update/${id}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchCart();

  } catch (error) {

    console.log(error);
  }
};