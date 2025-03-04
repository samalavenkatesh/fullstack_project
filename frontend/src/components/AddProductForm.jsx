import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const AddProductForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !quantity || !category || !description) {
      return handleError("All fields are required!");
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleError("User is not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/farmer/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          productName,
          price,
          quantity,
          category,
          description,
        }),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/FarmerDashboard");
        }, 1000);
      } else if (message) {
        handleError(message);
      } else {
        handleError(error);
      }
    } catch (err) {
      console.log(err);
      handleError("frontend error", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full p-5 justify-between">
        <div className="hidden md:block lg:w-1/2 border-r-2">
          <img
            className="m-10 md:mt-20"
            src="https://www.shutterstock.com/image-vector/simple-flat-style-design-farmer-600nw-2489616239.jpg"
            width={350}
            height={350}
            alt="Add Product"
          />
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Add a New Product</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Name
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mb-4"
                type="text"
                name="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price (₹) per kg
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mb-4"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity (in KG)
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mb-4"
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mb-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Crops">Crops</option>
              </select>

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Description
              </label>
              <textarea
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mb-4"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-600"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
