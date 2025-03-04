import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const FarmerDashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [farmer, setFarmer] = useState({});
  const [editProductId, setEditProductId] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: ""
  });

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);
  const [buyerData, setBuyerData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchSalesData();
  }, []);

//   useEffect(() => {
    const FetchBuyerDetails = async (orderId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/profile/buyer-details/${orderId}`, {
          method: "GET",
            headers: {authorization: token},
            // body : orderId
        });
        if (!response.ok) {
          handleError("Failed to fetch user data");
          return;
        }
        const result = await response.json();
        handleSuccess(result.message);
        const data = result.user;
        // console.log(data);
        setBuyerData(data);
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
        handleError( "failed to fetch api...");
      }
    };
    // fetchProfile();
//   }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/my-products`, {
        headers: { authorization: token },
      });
      const result = await response.json();
      if (result.success) {
        setProducts(result.products);
        setFarmer(result.farmerDetails);
      }
    } catch (err) {
      handleError("Failed to fetch products!");
    }finally {
        setLoadingProducts(false);
      }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/my-orders`, {
        headers: { authorization: token },
      });
      const result = await response.json();
      if (result.success) {
        setOrders(result.orders);
      }
    } catch (err) {
      handleError("Failed to fetch orders!");
    }finally {
        setLoadingOrders(false);
      }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/products/${productId}`, {
        method: "DELETE",
        headers: { authorization: token },
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        fetchProducts();
      }
    } catch (err) {
      handleError("Failed to delete product!");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/products/${editProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(productDetails),
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess("Product updated successfully!");
        fetchProducts();
        console.log(result.product)
        setEditProductId(null); // Exit edit mode
        setProductDetails({ name: "", price: "", quantity: "", category: "",description : "" });
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError("Failed to update product!");
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setProductDetails({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      description: product.description  || "",
    });
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
      if (result.success) {
        handleSuccess(result.message);
        fetchOrders();
      }
    } catch (err) {
      handleError("Failed to update order status!");
    }
  };



  const fetchSalesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/farmer/sales-data`, {
        headers: { authorization: token },
      });
      const result = await response.json();
      if (result.success) {
        setSalesData(result.salesData); // Assume salesData contains weekly sales for all products
      }
    } catch (err) {
      handleError("Failed to fetch sales data!");
    }finally {
        setLoadingSales(false);
    }
  };

  const prepareChartData = () => {
    const labels = salesData.length > 0 ? salesData[0].weeklySales.map((_, index) => `Week ${index + 1}`) : [];
    const datasets = salesData.map((product) => ({
      label: product.name,
      data: product.weeklySales,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      backgroundColor: `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`,
      tension: 0.4,
    }));
    return { labels, datasets };
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Farmer Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-green-500">{orders.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {orders.filter((o) => o.status === "Pending").length}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
          <p className="text-3xl font-bold text-blue-500">₹{farmer.myEarnings || 0}</p>
        </div>
      </div>
      <hr />

      {/* Sales Analysis Section */}
      
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">Product Sales Analysis</h2>
        {salesData.length > 0 ? (
        <div className="w-full max-w-full md:max-w-[800px] mx-auto bg-white shadow-md rounded-lg p-4 md:p-6 mb-10">
            <div className="w-full h-[250px] sm:h-[350px] md:h-[500px]">
            <Line
                data={prepareChartData()}
                options={{
                responsive: true,
                plugins: {
                    legend: {
                    position: "top",
                    },
                    title: {
                    display: true,
                    text: "Weekly Sales Analysis",
                    },
                },
                }}
            />
            </div>
        </div>
        ) : (
        <p className="text-gray-600 text-center">Loading sales data...</p>
        )}
        <hr />


      {/* My Products Section */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 m-4">My Products</h2>
      {loadingProducts? (<p className="text-gray-600 text-center">Loading products data...</p>) : ( "" ) }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://www.dropbox.com/scl/fi/tswrkz3t3wdgjjnjceghm/produces.jpg?rlkey=57xx1z1hku78sj0hrsowo8t8b&st=n7zf01r2&dl=1"
            //   src={product.image || "https://via.placeholder.com/100"}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Customer ratings: {product.rating ? product.rating.toFixed(1) : 0} ⭐</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditClick(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash className="inline mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      

      {/* Edit Product Section */}
      {editProductId && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Product</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={productDetails.name}
              onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
              className="border rounded px-4 py-2"
              placeholder="Product Name"
            />
            <input
              type="number"
              value={productDetails.price}
              onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
              className="border rounded px-4 py-2"
              placeholder="Price"
            />
            <input
              type="number"
              value={productDetails.quantity}
              onChange={(e) => setProductDetails({ ...productDetails, quantity: e.target.value })}
              className="border rounded px-4 py-2"
              placeholder="Quantity"
            />
            <input
              type="text"
              value={productDetails.category}
              onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
              className="border rounded px-4 py-2"
              placeholder="Category"
            />
            <input
              type="text"
              value={productDetails.description}
              onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
              className="border rounded px-4 py-2"
              placeholder="description"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditProductId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <hr />

      {/* Manage Orders Section */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-8 mb-4">Manage Orders</h2>
      {
        (!orders)?  (
            <div className="h-[200px]">
            <h3 style={{ 
                color: "gray", 
                textAlign: "center", 
                fontSize: "18px", 
                margin: "20px 0", 
                backgroundColor: "#f9f9f9", 
                padding: "10px", 
                borderRadius: "8px" 
            }}>
                No orders yet...
                
            </h3>
            </div>
        ) : (
            <div className="mb-10">
                {loadingOrders? (<p className="text-gray-600 text-center">Loading orders data...</p>) : ( "" ) }
                {/* <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Manage Orders</h2> */}
                <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg p-4">
                        <p className="text-gray-700">Order ID: {order._id}</p>
                        <p className="text-gray-700">Product: {order.name}</p>
                        <p className="text-gray-700">Quantity: {order.quantity}</p>
                        <p className="text-gray-700">Status: {order.status}</p>
                        <div className="mt-2 flex justify-end">
                            {order.status === "Pending" && (
                            <>
                                <button
                                onClick={() => FetchBuyerDetails(order._id)}
                                className="bg-yellow-400 text-white px-4 py-2 rounded m-2 "
                                >
                                View Details
                                </button>


                                <button
                                onClick={() => manageOrder(order._id, "Accepted")}
                                className="bg-green-500 text-white px-4 py-2 rounded m-2"
                                >
                                <FaCheck className="inline mr-1" /> Accept
                                </button>
                                <button
                                onClick={() => manageOrder(order._id, "Rejected")}
                                className="bg-red-500 text-white px-4 py-2 rounded m-2"
                                >
                                <FaTimes className="inline mr-1" /> Reject
                                </button>
                            </>
                            )}
                        </div>

                    </div>

                ))}
                </div>
                {/* buyer details */}
                 {/* Modal for Buyer Details */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Buyer Details</h3>
                            {buyerData ? (
                            <>
                                <p className="text-gray-600">Name: {buyerData.username}</p>
                                <p className="text-gray-600">Email: {buyerData.email}</p>
                                <p className="text-gray-600">Contact: {buyerData.mobile}</p>
                                <p className="text-gray-600">Address: {buyerData.address}</p>
                            </>
                            ) : (
                            <p className="text-gray-600">Loading details...</p>
                            )}
                            <div className="mt-4 flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
            </div>
        )
      }
      
    </div>
  );
};

export default FarmerDashboard;
