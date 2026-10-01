import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load product details.");
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading product...</p>
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

      <Link to="/" className="btn btn-secondary mb-4">
        ← Back to Products
      </Link>

      <div className="card shadow">

        <div className="row g-0">

          <div className="col-md-5 text-center p-5">

            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />

          </div>

          <div className="col-md-7">

            <div className="card-body p-5">

              <span className="badge bg-primary mb-3">
                Product ID: {product.id}
              </span>

              <h1 className="fw-bold mb-4">
                {product.title}
              </h1>

              <h2 className="text-success mb-4">
                ${product.price}
              </h2>

              <p className="text-muted">
                {product.description}
              </p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {product.rating?.rate} / 5
              </p>

              <p>
                <strong>Reviews:</strong>{" "}
                {product.rating?.count}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;