import "./Banner.css";

function Banner() {
  const scrollToProducts = () => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Fresh Groceries Delivered Fast</h1>
        <p>Best quality products at lowest prices</p>
        <button onClick={scrollToProducts}>
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
