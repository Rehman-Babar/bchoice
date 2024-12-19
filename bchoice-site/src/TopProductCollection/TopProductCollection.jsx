/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import { Link, useParams } from "react-router-dom";
import ZoomImage from "../hook/zoomImg"; // Import the ZoomImage component
import ProductDetailsTabs from "./Description";
import NewProductCards from "./NewProductCards";
import Footer from "../pages/Footer";
import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSingleProDuct } from "../store/everyProductAndBestSelling/singleProductOnTopProductCollextion";
import Loader from "../hook/Loader";
import Drawer from "../pages/home/product-card/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, updateItemQuantity } from "../store/cartSlice";
import { FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";

const TopProductCollection = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To track the selected image
  const [product, setProduct] = useState(null); // To track the selected product
  const [productImage, setproductImage] = useState(""); // Quantity state
  // const [quantity, setQuantity] = useState(1); // Quantity state
  const [visibleReviews, setVisibleReviews] = useState(6); // For handling visible product cards
  const [loading, setloading] = useState(true); // For handling visible product cards
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // drawer
  const openDrawer = () => setIsDrawerOpen(true); // Open Drawer
  const closeDrawer = () => setIsDrawerOpen(false); // Close Drawer
  // console.log(product);
  // Check if item is in the cart

  const removeFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // Static category value
  const catagry = "Best Seller";

  // Fetching best-selling products
  useEffect(() => {
    const getBestSelling = async () => {
      setloading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_KEY}/client/bestselling/${catagry}`);
        const data = await response.json();
        if (data.error) {
          // toast.error("Network response was not ok");
          console.log(data.error);
          return;
        }
        setBestSellingProducts(data);
      } catch (error) {
        // toast.error("Failed to fetch the data");
      } finally {
        setloading(false);
      }
    };
    getBestSelling();
  }, [catagry]);
  // get id from url
  const { id } = useParams();

  useEffect(() => {
    // if (status === "idle" && products.length === 0) {
    //   dispatch(fetchSingleProDuct({ id: id }));
    // }
    const GetSingleProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_KEY}/client/bestselling/singleProduct/${id}`);
        const data = await res.json();
        if (!data) {
          toast.error("No product found!!");
          return;
        }
        // console.log(data);
        if (!data.error) {
          const firstProduct = data;
          console.log(data)
          setproductImage(data.productImage);
          // Prepare the images array including productImage, hoverImage, and any additional productImages
          const imagesArray = [
            { src: firstProduct.productImage }, // Add the primary product image
            { src: firstProduct.hoverImage }, // Add the hover image
            ...firstProduct.productImages.map((img) => ({ src: img })), // Add any other images from productImages
          ];

          // Set the product details along with the images
          setProduct({
            title: firstProduct.productName,
            description: firstProduct.description,
            shortDescription: firstProduct.shortDescription,
            price: firstProduct.newPrice,
            originalPrice: firstProduct.oldPrice,
            rating: firstProduct.rating,
            images: imagesArray, // Use the images array with productImage and hoverImage
            id: firstProduct._id,
            unitsInStock: firstProduct.unitsInStock,
            discount: firstProduct.discount,
            category: firstProduct.category,
            reviews: firstProduct.reviews,
            olaPrice: firstProduct.olaPrice,
            brandName: firstProduct.brand,
            size: firstProduct.size,
            quality: firstProduct.quality,
            colors: firstProduct.colors,
            warranty: firstProduct.warranty
          });

          // Set the initial selected image as the primary productImage
          setSelectedImage({ src: firstProduct.productImage });
          // setproductImage({ src: firstProduct.productImage });
        }
      } catch (error) {
        toast.error("Failed to fetch the product data");
      }
    };
    GetSingleProduct();
  }, [id]);
  // console.log("product", product);

  // Handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const isInCart = cartItems.some((item) => item.id === product?.id);
  // console.log("cartItems", isInCart);
  const addToCartHandler = () => {
    if (!isInCart) {
      dispatch(
        addItemToCart({
          id: product.id,
          productName: product.title,
          productImage: productImage,
          quantity: 1, // D.efault quantity to 1
          price: product.price,
          totalPrice: product.price,
          category: "New Arrival",
        })
      );
      openDrawer(); // Open Drawer after adding to cart
    } else {
      openDrawer(); // If already in cart, just open the drawer
    }
  };

  const increaseQuantity = (item) => {
    dispatch(
      updateItemQuantity({
        id: item.id,
        quantity: item.quantity + 1, // Increment by 1
        totalPrice: (item.quantity + 1) * item.price,
      })
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateItemQuantity({
          id: item.id,
          quantity: item.quantity - 1, // Decrement by 1
          totalPrice: (item.quantity - 1) * item.price,
        })
      );
    }
  };
  // console.log(product);

  const isInWishlist = wishlist.some((item) => item.id === product?.id);
  const toggleWishlistHandler = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          productName: product.title,
          productImage: productImage,
          price: product.price,
          oldPrice: product.price,
          rating: product.rating,
          reviews: product.reviews,
          category: "New Arrival",
        })
      );
    }
  };

  // Load more reviews/products
  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3); // Load 3 more reviews each time
  };
  const lightBgColors = [
    // "#FFFFFF", // White+
    "#F8F9FA", // Light Gray
    "#E9ECEF", // Gray
    "#F0F4F8", // Very Light Gray
    "#E0F7FA", // Light Cyan
    "#E8F5E9", // Light Green
    "#FFF3E0", // Light Orange
    "#FCE4EC", // Light Pink
    "#F1F8E9", // Light Lime
    "#FBE9E7", // Light Coral
    "#F3E5F5", // Light Purple
    "#EDE7F6", // Light Indigo
    "#E0E0E0", // Light Steel
    "#FFEBEE", // Light Red
    "#FFFDE7", // Light Yellow
    "#E3F2FD", // Light Blue
    "#D1C4E9", // Light Lavender
  ];
  const getRandomColor = () => {
    return lightBgColors[Math.floor(Math.random() * lightBgColors.length)];
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader /> {/* Show the Loader component when loading */}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <Navbar2 />
        <div className="bg-gradient-to-r from-orange-400 to-red-400">
          <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-20">
            <h1 className="text-lg md:text-2xl font-bold text-white">Top Collection</h1>
            <nav className="flex justify-center" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to={"/"}
                    className="inline-flex items-center text-xs md:text-lg font-medium text-white hover:text-blue-600">
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-white mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to={"/top-collection"}
                      className="ms-1 text-xs md:text-lg font-medium text-white hover:text-blue-600 md:ms-2">
                      Top Collection
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="container mx-auto w-full p-4 -mt-16 md:-mt-6 max-w-7xl">
          {/* Product Section */}
          {product && (
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Product Image */}
              <div className="md:w-[39%]">
                {/* Wrapping the ZoomImage component with a 'group' class */}
                <div className="group">
                  <ZoomImage
                    src={selectedImage?.src}
                    alt="Product image"
                    containerClassName="h-92"
                    className="w-full h-full object-right transition-transform rounded-sm duration-300 group-hover:scale-150"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="flex mt-4 gap-2 justify-center md:justify-start flex-wrap ">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={`Thumbnail ${index}`}
                      className={`w-20 h-20 object-cover cursor-pointer border rounded-sm ${
                        selectedImage?.src === image.src ? "border-black" : "border-gray-300"
                      }`}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-[57%] w-full ">
                <h1 className="text-lg md:text-3xl font-bold mb-2 tracking-wide md:tracking-wider">{product.title}</h1>

                <div>
                  <p className="text-gray-700 mb-4 max-w-full md:max-w-[70%] text-md md:text-lg  break-words">
                    {product.shortDescription}
                  </p>
                </div>

                <p className="text-lg md:text-2xl font-extrabold mb-4 tracking-wider">
                  Rs:{product.price}{" "}
                  <span className="line-through font-semibold text-gray-700 leading-5">Rs:{product.originalPrice}</span>
                </p>

                {/* Quantity Selector */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  

                  <button
                    className="bg-green-500 text-white text-xs md:text-md px-4 py-2 rounded w-full md:w-auto"
                    onClick={() => addToCartHandler()}>
                    Add To Cart
                  </button>

                  {/* <button className="bg-gray-200 px-4 py-2 rounded w-full md:w-auto">❤️</button> */}
                  <FaHeart
                    className={` cursor-pointer bg-gray-200 px-4 py-2 rounded w-full md:w-auto  ${
                      isInWishlist ? "text-red-500 size-10" : "text-red-400 size-8"
                    }`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link navigation
                      toggleWishlistHandler();
                    }}
                  />
                </div>
                <div className="mt-4 space-y-2">
                <p className="text-black text-md md:text-xl font-bold">Product Name: {" "}
                <span className="md:text-lg text-sm ml-1 font-normal text-gray-700 tracking-wide md:tracking-widest">{product.title.split(" ").slice(0, 3).join(" ")}
                {product.title.split(" ").length > 3 }</span>
                </p>
                <p className="text-black text-md md:text-xl  font-bold">Brand/Type:<span className="md:text-lg text-sm ml-1 font-normal text-gray-700 tracking-wide md:tracking-widest">{product.brandName}</span></p>
                <p className="text-black text-md md:text-xl font-bold">Size: <span className="md:text-lg text-sm ml-1 font-normal text-gray-700 tracking-wide md:tracking-widest">{product.size}</span></p>
                <p className="text-black text-md md:text-xl font-bold">Quality: <span className="md:text-lg text-sm ml-1 font-normal text-gray-700 tracking-wide md:tracking-widest">{product.quality}</span></p>
                <p className="text-black text-md md:text-xl font-bold">Colors: <span className="md:text-lg text-sm ml-1 font-normal text-gray-700 tracking-wide md:tracking-widest">{product.colors}</span></p>
                <p className="text-black text-md md:text-xl font-bold">Warranty: <span className="md:text-lg text-sm ml-1 font-normal text-gray-700 tracking-wide md:tracking-widest">{product.warranty}</span></p>
                </div>

              </div>
            </div>
          )}
        </div>
        <ProductDetailsTabs product={product} />

        <div className="text-center p-10">
          <h1 className="font-bold text-4xl mb-4">Similler Products</h1>
          <h1 className="text-3xl">Best Collection</h1>
        </div>

        {bestSellingProducts?.length === 0 ? (
          <p className="text-center text-lg">No products found.</p>
        ) : (
          <section
            id="Projects"
            className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10  mb-10">
            {bestSellingProducts?.slice(0, visibleReviews).map((product) => (
              <NewProductCards
                key={product._id}
                brand={product?.brand}
                image={product.productImage} // Select the first image in the productImages array
                price={product.newPrice}
                oldPrice={product.oldPrice}
                name={product.productName}
                bgColor={getRandomColor()}
                id={product._id}
                rating={product.rating}
                category={product.category}
              />
            ))}
          </section>
        )}

        {visibleReviews < bestSellingProducts.length && (
          <div className="text-center my-8 mx-auto">
            <button
              onClick={loadMoreReviews}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
              Load More
            </button>
          </div>
        )}
        <Footer />
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        content={
          <div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-1">
                    <div className="flex gap-4">
                      <div className="p-1 bg-gray-200 rounded-md">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover shrink-0 rounded-md border"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">
                        {item.productName.split(" ").slice(0, 2).join(" ")}
                        {item.productName.split(" ").length > 2 && "..."}
                        </p>
                        <p className="text-gray-500">Price: Rs{item.price}</p>
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => decreaseQuantity(item)}>
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => increaseQuantity(item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between flex-col p-2 border-b mb-3">
                      <div className="font-bold">Rs{item.totalPrice.toFixed(2)}</div>
                      <button
                        className="text-red-500 underline hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">
                    Total: Rs{cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <button onClick={closeDrawer} className="bg-red-500 text-white py-2 px-4 rounded">
                    Continou Shoping
                  </button>
                  <Link to={"/cart"} className="bg-red-500 text-white py-2 px-4 rounded">
                    Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        }
      />
    </>
  );
};

export default TopProductCollection;
