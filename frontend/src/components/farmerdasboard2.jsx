import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";

const FarmerDashboard = () => {
//   const API_BASE_URL = "https://farmer-market-backend-xpxy.onrender.com";
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [farmer , setFarmer] = useState([]);
  const [click , setClick] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [click]);

  const fetchProducts = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/farmer/my-products`, {
            headers: { authorization: token },
        });
        const result = await response.json();
        console.log(result.products);
        if (result.success){
            setProducts(result.products);
            setFarmer(result.farmerDetails);
        } 
    } catch (err) {
      handleError("Failed to fetch products!");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/my-orders`, {
        headers: { authorization: token },
      });
      const result = await response.json();
    //   console.log(result.orders);
      if (result.success) setOrders(result.orders);
    } catch (err) {
      handleError("Failed to fetch orders!");
    }
  };

// Handle Delete Product
const handleDelete = async (productId) => {
    try {
        const response = await fetch(`/api/farmer/products/${productId}`, {
        method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
        fetchProducts(); // Refresh products
        } else {
        console.error("Failed to delete product:", data.message);
        }
    } catch (err) {
        console.error("Error deleting product:", err.message);
    }
};


// Handle Update Product
const handleUpdate = async () => {
    try {
        const response = await fetch(`/api/farmer/products/${editProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDetails),
        });
        const data = await response.json();
        if (data.success) {
        fetchProducts(); // Refresh products
        setEditProductId(null); // Exit edit mode
        setProductDetails({ name: "", price: "", quantity: "", category: "" });
        } else {
        console.error("Failed to update product:", data.message);
        }
    } catch (err) {
        console.error("Error updating product:", err.message);
    }
};
    

  const manageOrder = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/manage-order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      console.log("response for accept or reject :  ",result);
      if (result.success) {
        handleSuccess(result.message);
        setClick(click + 1);
        fetchOrders();
      }
    } catch (err) {
      handleError("Failed to update order status!");
    }
  };



  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
//   const acceptedRejectedOrders = totalOrders - pendingOrders;

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      {/* Header Section */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Farmer Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-green-500">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-500">{pendingOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 px-10 flex justify-between ">
          {/* <p className="text-3xl font-bold text-blue-500">{acceptedRejectedOrders}</p> */}
          <span>
          <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
          <p className="text-3xl font-bold text-blue-500">₹{farmer.myEarnings}</p>
          </span>
          <span  className="text-4xl text-yellow-500 m-4">
          💰
          </span>
        </div>
      </div>

      {/* My Products Section */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">My Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={product.image || "https://via.placeholder.com/100"}
              alt={product.name}
              className="w-[150px] h-32 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <p className="text-gray-600">Remaining Quantity: {product.quantity}</p>
            <p className="text-gray-600">Category: {product.category}</p>
          </div>
        ))}
      </div>

        {/* Manage Orders Section */}
        <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Manage Orders</h2>
        <div className="space-y-4">
                {orders.map((order) => (
                <div key={order._id} className="bg-white shadow-md rounded-lg p-4">
                    <p className="text-gray-700">Order ID: {order._id}</p>
                    {/* <p className="text-gray-700">Buyer Name: {buyerName}</p> */}
                    <p className="text-gray-700">Product: {order.name}</p>
                    <p className="text-gray-700">Quantity: {order.quantity}</p>
                    <p className="text-gray-700">Total Amount: ₹{order.totalAmount}</p>
                    <p className="text-gray-700">Date of order : {order.createdAt}</p>
                    {/* <p className="text-gray-700">Status: {order.status}</p> */}
                    {order.status != "Pending" ? (
                        <div> <button
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            {order.status}
                        </button> </div>
                    ) : (
                        <div className="mt-4">
                        <button
                            onClick={() => manageOrder(order._id, "Accepted") }
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => manageOrder(order._id, "Rejected")}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Reject
                        </button>
                        </div>
                    )}
                </div>
                ))}
        </div>
    </div>
  );
};

export default FarmerDashboard;
