import React from "react";

const ViewProductModal = ({ productData, closeModal }) => {
  if (!productData) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen overflow-y-scroll">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Details</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600"
              onClick={closeModal}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 9.293l-4.646-4.647A1 1 0 104.646 3.354L10 7.707l4.646-4.646A1 1 0 1014.354 4.646L10 9.293z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 10.707l4.646 4.646A1 1 0 1014.354 16.646L10 12.293l-4.646 4.646A1 1 0 105.646 15.354L10 10.707z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <div className="grid gap-4">
              <div>
                <label className="font-semibold">Product Name:</label>
                <p>{productData.productName}</p>
              </div>

              <div>
                <label className="font-semibold">Category:</label>
                <p>{productData.category}</p>
              </div>

              <div>
                <label className="font-semibold">Description:</label>
                <p>{productData.description}</p>
              </div>

              <div>
                <label className="font-semibold">Short Description:</label>
                <p>{productData.shortDescription}</p>
              </div>

              <div>
                <label className="font-semibold">Price:</label>
                <p>
                  ${productData.newPrice} <span className="line-through text-red-500">${productData.oldPrice}</span>
                </p>
              </div>

              <div>
                <label className="font-semibold">Discount:</label>
                <p>{productData.discount}%</p>
              </div>

              <div>
                <label className="font-semibold">Rating:</label>
                <p>{productData.rating} / 5</p>
              </div>

              <div>
                <label className="font-semibold">Reviews:</label>
                <p>{productData.reviews}</p>
              </div>

              <div>
                <label className="font-semibold">Units in Stock:</label>
                <p>{productData.unitsInStock}</p>
              </div>

              <div>
                <label className="font-semibold">Hover Image:</label>
                <img src={productData.hoverImage} alt="Hover" className="w-full rounded" />
              </div>

              <div>
                <label className="font-semibold">Product Image:</label>
                <img src={productData.productImage} alt="Product" className="w-full rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
