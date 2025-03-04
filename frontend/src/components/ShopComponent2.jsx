import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { handleError, handleSuccess } from "../utils"; // Import handleError and handleSuccess
import { useNavigate } from "react-router-dom";

function ShopComponent2() {
//   const API_BASE_URL = "https://farmer-market-backend-xpxy.onrender.com"; // Replace with your actual backend URL
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/retailer/products`, {
          headers: {
            authorization: localStorage.getItem("token"), // Token from localStorage
          },
        });

        const data = await response.json();
        // console.log("DATA:  ",data);
        if (data) {
            setProducts(data);
            // handleSuccess("Products loaded successfully!");
        }else {
            console.error("Error: products is undefined or not an array");
            setProducts([]); // Fallback to prevent rendering issues
        }
        // setProducts(data.products); // Assuming the products are returned in `data.products`
      } catch (error) {
        console.error("Failed to fetch products:", error);
        handleError(error.message);
      }finally {
        setLoading(false); // End loading
      }

    };

    fetchProducts();
  }, []);

//   const handleBuy = async (productId) => {
//     const quantity = prompt("Enter quantity to purchase:");

//     if (!quantity || isNaN(quantity) || quantity <= 0) {
//       return handleError("Invalid quantity. Please enter a valid number.");
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/retailer/buy-product/${productId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ quantity: parseInt(quantity) }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         handleSuccess("Purchase successful!");
//       } else {
//         handleError(data.error || "Failed to place order. Please try again.");
//       }
//     } catch (error) {
//       handleError(`Failed to buy product: ${error.message}`);
//     }
//   };

  return (
    <div >
      {/* <h1>Shop</h1> */}


      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
          <span className="ml-4 text-green-500 text-lg font-medium">Loading products...</span>
        </div>
      ) : (

        <div className="flex flex-col gap-4">
            {products.map((product) => (
            <ProductCard
                productId={product._id}
                key={product._id}
                name={product.name}
                rating={product.rating || 4.0}
                reviews={0}
                farmerId={product.farmer || "Unknown"}
                tags={["Category: " + product.category]}
                image="https://www.dropbox.com/scl/fi/kexo4rymxt2tmmg0xghtp/fruits.jpg?rlkey=6bwh1pkqbmykd0v88v628lyuw&st=5c3bqe8c&dl=1"
                // image={product.image || "https://via.placeholder.com/100"}
                price={`₹${product.price}`}
                originalPrice={null} // Optional
                discountPercentage={null} // Optional
                onClick={() => navigate(`/product/${product._id}`)} // Navigate to details page
            >
                
            </ProductCard>
            ))}
        </div>
      )}
    </div>
  );
}

export default ShopComponent2;
