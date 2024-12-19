import React, { useState } from "react";

const ProductDetailsTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const reviews = [
    {
      id: 1,
      name: "Oreo Noman",
      date: "Jan 08, 2024",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente doloribus debitis corporis, eaque dicta, repellat amet.",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Lina Wilson",
      date: "Mar 22, 2024",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente doloribus debitis corporis, eaque dicta, repellat amet.",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="w-full p-6 max-w-6xl mx-auto border-2 rounded-md mb-10">
      {/* Tab Navigation */}
      <div className="flex justify-start gap-6 border-b">
        <button
          className={`pb-2 text-gray-700 ${
            activeTab === "description" ? "border-b-2 border-green-500 text-green-500" : ""
          }`}
          onClick={() => setActiveTab("description")}>
          Description
        </button>
        <button
          className={`pb-2 text-gray-700 ${
            activeTab === "reviews" ? "border-b-2 border-green-500 text-green-500" : ""
          }`}
          onClick={() => setActiveTab("reviews")}>
          Review
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6 h-52 overflow-y-auto">
        {activeTab === "description" && (
          <div className="h-full">
            <h3 className="text-lg text-black font-semibold py-2">Description</h3>
            <p>{product?.description}</p>
            <h4 className="text-lg text-black font-semibold py-2 border-b">Packaging & Delivery</h4>
            <p>
              Packaging and delivery involve ensuring products are securely packed and dispatched to customers
              efficiently. Proper packaging protects the items during transit, while timely delivery ensures customer
              satisfaction. The process also includes selecting appropriate materials and methods to meet both product
              safety and environmental considerations.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="h-[full]">
            <h3 className="text-lg text-black font-semibold py-2">Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-start space-x-4">
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex items-center text-yellow-400 text-sm">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <p className="text-gray-700 mt-2 -ml-16">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-lg">Add a Review</h4>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm">Your Rating:</label>
                  <div className="flex items-center text-yellow-400">★ ★ ★ ★ ★</div>
                </div>
                <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
                <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
                <textarea placeholder="Enter your comment" className="w-full border p-2 rounded" />
                <button className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTabs;
