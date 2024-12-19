import React, { useEffect, useState, useMemo } from "react";
import CollectionCard from "./product-card/CollectionCard";
import toast from "react-hot-toast";

const TopCollection = () => {
  const [visibleProduct, setVisibleProduct] = useState(10);
  const [productdata, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadMoreReviews = () => {
    setVisibleProduct((prev) => prev + 5);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_KEY}/client/allproduct/home/bestselling`);
        const data = await response.json();
        // console.log("Fetched Products:", data);

        setProducts(data);
        
        // Initial filtering of products
        const initialFiltered = data.filter(  
          (product) => product.category === "New Arrival" || product.category === "Best Seller"
        );
        setFilteredProducts(initialFiltered);
        console.log("Initial Filtered Products:", initialFiltered);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Internal server error");
      }
    };

    // Fetch products only if productdata is empty
    if (productdata.length === 0) {
      fetchProducts();
    }
  }, [productdata]);

  // Filter function to handle various categories
  const filterProducts = (type) => {
    setFilteredProducts(() => {
      if (type === "All") {
        return productdata;
      } else {
        return productdata.filter((product) => product.type === type);
      }
    });
  };

  const displayProducts = useMemo(() => filteredProducts.slice(0, visibleProduct), [filteredProducts, visibleProduct]);

  return (
    <>
      {/* Heading and Filter Section */}
      <div className="flex flex-col xl:flex-row xl:justify-between pt-10 pb-6 pl-3 md:px-28 space-y-4 xl:space-y-0">
        <div className="flex flex-col items-start mb-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Our All Products</h1>
          <p className="text-gray-800 text-sm md:text-base">
            Shop online for the best collections and enjoy free shipping!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3 md:space-x-4">
          {["All", "Men", "Women"].map((type) => (
            <button
              key={type}
              className="text-gray-800 hover:text-gray-600 border-2 px-5 py-2 rounded-md transition-colors duration-200"
              onClick={() => filterProducts(type)}
            >
              {type}
            </button>
          ))}

          {/* Dropdown Filter */}
          <select
            className="border-2 px-2 py-2 rounded-md text-gray-800 bg-white hover:text-gray-600 transition-colors duration-200"
            onChange={(e) => filterProducts(e.target.value)}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            <option value="Tech">Tech</option>
            <option value="Toy And Games">Toy And Games</option>
            <option value="Beauty And Persnol Care">Beauty And Persnol Care</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:px-24">
        {displayProducts.map((product, index) => (
          <div key={index} className="">
            <CollectionCard {...product} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleProduct < filteredProducts.length && (
        <div className="text-center my-8 mx-auto">
          <button
            onClick={loadMoreReviews}
            className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default TopCollection;
