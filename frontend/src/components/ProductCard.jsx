import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { price, originalPrice, discountPercentage, productId, reviewsCount } = props;
  const navigate = useNavigate();

  const validOriginalPrice = originalPrice ? parseInt(originalPrice.replace('₹', '')) : 0;
  const validPrice = price ? parseInt(price.replace('₹', '')) : 0;
  const discountedPrice = validOriginalPrice
    ? validOriginalPrice * (1 - discountPercentage / 100)
    : validPrice;

  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState("");

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleView = () => {
    navigate(`/Product/${productId}`);
  };

  const handleBuy = async (productId) => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return handleError("Invalid quantity. Please enter a valid number.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/retailer/buy-product/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity: parseInt(quantity) }),
      });

      const data = await response.json();
      if (response.ok) {
        handleSuccess("Order placed successfully!");
        setTimeout(() => {
          navigate("/BuyerDashboard");
        }, 1000);
      } else {
        handleError("Failed to place order. Please try again.");
      }
    } catch (error) {
      handleError(`Failed to buy product: ${error.message}`);
    }
  };

  return (
    <div className="max-w-full md:max-w-4xl w-full flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-lg mx-auto mb-4">
      {/* Modal for quantity input */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Quantity</h2>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
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
                onClick={(e) => handleBuy(productId)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="w-full sm:w-32 md:w-40 flex justify-center mb-4 sm:mb-0">
        <img
          src={props.image}
          alt="Product Display"
          className="w-full h-32 md:h-40 object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow sm:ml-4 text-center sm:text-left">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">{props.name}</h2>
        <div className="flex justify-center sm:justify-start items-center text-sm text-gray-600 mt-2">
          <span className="mr-2">
            <span className="font-bold">{props.rating ? props.rating.toFixed(1) : 0} ⭐</span>
          </span>
          <span className="mr-2">({reviewsCount}) ratings</span>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
          {props.tags.map((tag, index) => (
            <span key={index} className="bg-yellow-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            // onClick={() => setIsModalOpen(true)}
            onClick={handleView}
            className="bg-green-500 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-green-600 transition"
          >
            Buy
          </button>
          <button
            onClick={handleView}
            className="bg-gray-100 text-green-500 text-sm font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition"
          >
            View
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-0">
        <div className="flex flex-col items-end sm:items-start">
          <span className="text-lg font-semibold text-gray-800">{`₹${discountedPrice.toFixed(2)}`}</span>
          {validOriginalPrice > 0 && (
            <span className="text-sm text-gray-500 line-through mt-1">{props.originalPrice}</span>
          )}
        </div>
        <button
          onClick={handleLikeClick}
          className={`text-2xl ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition mt-2 sm:mt-0`}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
