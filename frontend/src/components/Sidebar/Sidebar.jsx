import "./Sidebar.css";

function Sidebar({
  setSelectedCategory
}) {

  const categories = [

    {
      id: null,
      name: "All Products"
    },

    {
      id: 1,
      name: "Fruits"
    },

    {
      id: 2,
      name: "Vegetables"
    },

    {
      id: 3,
      name: "Dairy"
    },

    {
      id: 4,
      name: "Beverages"
    },

    {
      id: 5,
      name: "Snacks"
    },

    {
      id: 6,
      name: "Personal Care"
    }
  ];

  return (

    <div className="sidebar">

      <h3>
        Categories
      </h3>

      <ul>

        {
          categories.map((category) => (

            <li
              key={category.id}
              onClick={() =>
                setSelectedCategory(
                  category.id
                )
              }
            >

              {category.name}

            </li>
          ))
        }

      </ul>

    </div>
  );
}

export default Sidebar;