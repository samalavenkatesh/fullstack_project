import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { handleError } from "../utils";
import { useNavigate } from "react-router-dom";

function ShopComponent() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/retailer/products`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products
        } else {
          console.error("Failed to load products");
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        handleError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="p-4 w-full relative bg-gradient-to-r from-green-200 to-yellow-100 m-0 ">
        {/* Search Input */}
        <div className="w-full md:w-[600px] m-auto mt-8 flex items-center mb-6">
        <input
        type="text"
        placeholder="Search products by name or category..."
        value={searchQuery}
        onChange={handleSearch}
        // onChange={}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-l-md focus:border-yellow-200 outline-none"
        // className="w-full px-4 py-2 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
        />


        <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 transition border-2 border-yellow-500"
            onClick={() => handleSearch({ target: { value: searchQuery } })}
        >
            Search
        </button>
        </div>


      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-b-4 border-yellow-500 rounded-full w-12 h-12 animate-spin"></div>
          <span className="ml-4 text-yellow-500 text-lg font-medium">Loading products...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                productId={product._id}
                key={product._id}
                name={product.name}
                rating={product.rating }
                reviewsCount={product.reviewsCount}
                farmerId={product.farmer || "Unknown"}
                tags={["Category: " + product.category]}
                image="https://www.dropbox.com/scl/fi/kexo4rymxt2tmmg0xghtp/fruits.jpg?rlkey=6bwh1pkqbmykd0v88v628lyuw&st=5c3bqe8c&dl=1"
                price={`₹${product.price}`}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No products found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShopComponent;
