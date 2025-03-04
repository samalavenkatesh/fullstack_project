import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const [product, setProduct] = useState({});
  const [farmer, setFarmer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();

        if (response.ok) {
          setProduct(result.product || {});
          setFarmer(result.farmer || {});
        //   handleSuccess("Product details loaded successfully!");
        } else {
          handleError(result.message || "Failed to fetch product details.");
        }
      } catch (error) {
        handleError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/review/${productId}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();

        if (response.ok) {
          setReviews(result.reviews || []);
        } else {
          handleError(result.message || "Failed to fetch reviews.");
        }
      } catch (error) {
        handleError(error.message);
      }
    };

    fetchProductDetails();
    fetchReviews();
  }, [productId]);

  const handleBuy = async () => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return handleError("Invalid quantity. Please enter a valid number.");
    }
    setIsModalOpen(false);

    try {
      const response = await fetch(`${API_BASE_URL}/retailer/buy-product/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity: parseInt(quantity, 10) }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess("Purchase successful!");
        setTimeout(() => {
          navigate("/BuyerDashboard");
        }, 1000);
      } else {
        handleError(data.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      handleError(`Failed to buy product: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-20 mb-20 border border-gray-200">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
          <span className="ml-4 text-green-500 text-lg font-medium">Loading product details...</span>
        </div>
      ) : (
        <>
          {/* Back Button */}
          <button
            className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </button>

          {/* Product Details */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={"https://www.dropbox.com/scl/fi/kexo4rymxt2tmmg0xghtp/fruits.jpg?rlkey=6bwh1pkqbmykd0v88v628lyuw&st=5c3bqe8c&dl=1" || "https://via.placeholder.com/400"}
              alt={product.name || "Product Image"}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md border border-gray-300"
            />
            <div className="flex-1 flex flex-col justify-between">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name || "Product Name"}</h2>
              <p className="text-gray-600 mb-2">Category: {product.category || "Unknown"}</p>
              <p className="text-gray-600 mb-4">
                <p className="text-yellow-500">
                      {'⭐'.repeat(product.rating)}
                      {'☆'.repeat(Math.ceil(5 - product.rating))}&nbsp;<span className="text-black font-bold"> {product.rating ? product.rating.toFixed(1) : 0}</span>
                </p>
                {product.reviewsCount || "No rating yet"} ratings
                </p>
              <p className="text-xl text-green-600 font-semibold mb-4">
                Price: ₹{product.price ? product.price.toLocaleString() : "N/A"}
              </p>
              <p className="text-gray-800 mb-6">{product.description || "No description available."}</p>

              {/* Buy Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white text-sm font-semibold px-8 py-2 rounded-md hover:bg-green-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
            {reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review) => (
                  <li key={review._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                    <p className="font-semibold text-gray-800">{review.username || "Anonymous"}</p>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-yellow-500">
                      {'⭐'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            )}
          </div>

          {/* Modal for Quantity Input */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Quantity (in KG)</h2>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-green-500"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBuy}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Farmer Information */}
          <div className="mt-8 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-2">Farmer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Name:</span> {farmer.username || "Unknown"}</p>
              <p><span className="font-semibold">Contact:</span> {farmer.mobile || "Not available"}</p>
              <p><span className="font-semibold">Email:</span> {farmer.email || "Not available"}</p>
              <p><span className="font-semibold">Address:</span> {farmer.address || "Not available"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
