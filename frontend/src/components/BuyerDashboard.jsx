import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils";

function BuyerDashboard() {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [disableReview,setDisableReview] = useState(false);
//   console.log(disableReview);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/retailer/my-orders`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
        // console.log(data);
        // handleSuccess("Successfully loaded orders.");
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        handleError(error.message || "Something went wrong.");
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const spent = orders.reduce((acc, order) => {
      return acc + (order.status !== "Rejected" ? order.totalAmount : 0);
    }, 0);
    setTotalSpent(spent);
  }, [orders]);

  const handleReviewSubmit = async (productId) => {
    if (rating < 1 || rating > 5 || !comment.trim()) {
      return handleError("Please provide a valid rating (1-5) and a comment.");
    }
    setReviewModalOpen(false);

    try {
      const response = await fetch(`${API_BASE_URL}/review/product/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ rating, comment }),
      });
      if (response.ok) {
        handleSuccess("Review submitted successfully!");
        setReviewModalOpen(false);
        setDisableReview(true);
        console.log(disableReview);
        setRating(1);
        setComment("");
        // Optionally, refresh the orders data to show the new review
        // fetchOrders();
      } else {
        const data = await response.json();
        handleError(data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      handleError("Failed to submit review.");
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Buyer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-green-500">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-500">{pendingOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Spent</h2>
          <p className="text-3xl font-bold text-blue-500">₹{totalSpent.toLocaleString()}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className={
                  order.status === "Pending"
                    ? "bg-yellow-200 text-gray-700 text-sm"
                    : order.status === "Accepted"
                    ? "bg-green-200 text-gray-700 text-sm"
                    : "bg-red-200 text-gray-700 text-sm"
                }
              >
                <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">₹{order.totalAmount}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{order.status}</td>
                <td className="flex justify-center border border-gray-300 px-4 py-2">
                  {order.status === "Accepted" && (
                    <button
                      onClick={() => {
                        setSelectedOrderId(order.product);
                        setReviewModalOpen(true);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      disabled={disableReview}
                    >
                      Write Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Review</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReviewSubmit(selectedOrderId)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;
