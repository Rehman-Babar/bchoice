import React, { useEffect, useState } from 'react'
import EditModal from './hooks/EditModal'
import ViewProductModal from './hooks/ViewProductModal'
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from 'state/newArrivalAndBestSeller';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from 'state/allproducts';
import { FaPlus } from 'react-icons/fa';

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allproducts.items);
    const status = useSelector((state) => state.allproducts.status);
  
    // Local state to manage the modal visibility and the product being edited
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    // console.log(currentProduct);
    // const [currentEditProduct, setCurrentEditProduct] = useState(null);
    const [deletingProductId, setDeletingProductId] = useState(null); // State to manage deletion loading
  
    // Fetch products when the component mounts
    useEffect(() => {
      if (status === "idle" && products.length === 0) {
        dispatch(fetchAllProducts());
      }
    }, [status, dispatch, products.length]);
  
    // Filter products by "New Arrival" category
    // const newArrivalProducts = products.filter((item) => item.category === "New Arrival");
  
    // Function to handle product deletion
    const handleDelete = async (productId) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this product?");
      if (!isConfirmed) {
        return; // Exit the function if the user cancels
      }
      setDeletingProductId(productId); // Set the ID of the product being deleted
      const url = `${process.env.REACT_APP_BASE_URL}/client/delete/product/admin/${productId}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (response.ok) {
          dispatch(fetchAllProducts()); // Refetch products after deletion
        } else {
          console.error("Failed to delete the product");
          dispatch(fetchAllProducts());
        }
      } catch (error) {
        console.error("Error occurred while deleting the product:", error);
      } finally {
        setDeletingProductId(null); // Clear the deleting state
      }
    };
  
    // Function to handle opening the modal with the selected product data
    const handleEditClick = (product) => {
      setCurrentProduct(product);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      dispatch(fetchAllProducts());
      setCurrentProduct(null); // Reset current product when closing
    };
  
    const handleViewClick = (product) => {
      setCurrentProduct(product);
      setIsViewModalOpen(true);
    };
  
    const closeViewModal = () => {
      setIsViewModalOpen(false);
  
      setCurrentProduct(null);
    };
  
    if (status === "loading") {
      return <div className="fixed inset-0 flex items-center justify-center z-50">Loading....</div>;
    }
  return (
    <>
          <div className="flex flex-col xl:flex-row xl:justify-between pt-10 pb-6 pl-3  md:px-28 space-y-4 xl:space-y-0">
        {/* Left section (Heading and subheading) */}
        <div className="flex flex-col items-start mb-2">
          <h1 className="text-2xl text-black md:text-3xl font-bold mb-2">All Products</h1>
          <p className="text-sm text-black md:text-base">All products that customers love!</p>
        </div>

        {/* Right section (Link with blur and hover glow) */}
        <div className="glass px-4 py-4 bg-white backdrop-blur-md rounded-lg w-full xl:w-auto">
          <Link
            to={"/addproducts"}
            className="text-2xl  text-black flex items-center justify-center w-full xl:w-12 h-12 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <FaPlus className="text-[#818d86f4] size-9"/>
          </Link>
        </div>
      </div>

      <div className="h-[70vh]  flex items-center   p-4">
        <div className="grid grid-cols-1 gap-6 bg-[#d597fa2a] p-4 shadow-md rounded-lg max-w-[100rem] w-full">
          {/* Product Table Section */}
          <div className="bg-[#e4c1f91a] p-6 rounded-md w-full">
            {/* <h2 className="text-black text-xl mb-4">New Arrival Categories</h2> */}
            <div className="overflow-y-auto h-[26rem]">
              {products?.length > 0 ? (
                <table className="table-auto w-full  text-left text-black border border-[#A9DEF9]">
                  <thead>
                    <tr className="bg-[#FCF9FE] border-b border-[#A9DEF9]">
                      <th className="p-2 border-r border-[#A9DEF9]">Sr No.</th>
                      <th className="p-2 border-r border-[#A9DEF9]">Product Name</th>
                      <th className="p-2 border-r border-[#A9DEF9]">Discount Price</th>
                      <th className="p-2 border-r border-[#A9DEF9]">Original Price</th>
                      <th className="p-2 border-r border-[#A9DEF9]">Category</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, idx) => (
                      <tr key={idx} className="bg-[#FCF9FE] border-b border-[#A9DEF9]">
                        <td className="p-2 border-r border-[#A9DEF9]">{idx + 1}</td>
                        <td className="p-2 border-r border-[#A9DEF9]">
                        {item.productName.split(" ").slice(0, 4).join(" ")}
                        {item.productName.split(" ").length > 4}...
                        </td>
                        <td className="p-2 border-r border-[#A9DEF9]">Rs:{item.newPrice}</td>
                        <td className="p-2 border-r border-[#A9DEF9]">Rs:{item.oldPrice}</td>
                        <td className="p-2 border-r border-[#A9DEF9]">{item.category}</td>
                        <td className="p-2 flex space-x-2">
                          <button onClick={() => handleViewClick(item)} className="bg-[#D0F4DE] p-2 rounded text-black">
                            View
                          </button>
                          <button
                            onClick={() => handleEditClick(item)} // Open modal with the product data
                            className="bg-[#FCF6BD] p-2 rounded text-black">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)} // Call delete function
                            className="bg-red-500 p-2 rounded text-black flex items-center justify-center">
                            {deletingProductId === item._id ? "Deleting..." : "Delete"} {/* Show loading text */}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-white text-center">No products found in this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render EditModal if open */}
      {isModalOpen && <EditModal productData={currentProduct} closeModal={closeModal} />}
      {isViewModalOpen && <ViewProductModal productData={currentProduct} closeModal={closeViewModal} />}
    </>
  )
}

export default AllProducts