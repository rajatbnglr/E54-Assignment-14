import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">E54 Products Store</h1>
        <p className="text-muted">
          E54 Assignment 14 - URL Params
        </p>
      </div>

      <div className="row g-4">

        {products.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={product.id}
          >
            <div className="card h-100 shadow-sm product-card">

              <img
                src={product.image}
                className="card-img-top p-4"
                alt={product.title}
                style={{
                  height: "250px",
                  objectFit: "contain",
                }}
              />

              <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                  {product.title}
                </h5>

                <p className="text-primary fw-bold fs-5">
                  ${product.price}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary mt-auto"
                >
                  View Details
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;