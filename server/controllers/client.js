import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import { v2 as cloudinary } from "cloudinary";
import InCommingProduct from "../models/InCommingProducts.js";
import BestSelling from "../models/BestSellingProduct.modal.js";

// not mine
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// mine changed
export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      discount,
      newPrice,
      oldPrice,
      unitsInStock,
      category,
      reviews,
      rating,
      description,
      shortDescription,
      productImages = [],
      videoUrl= [],
      brand,
      type,
      size,
      quality,
      colors,
      warranty
    } = req.body;

    let { productImage, hoverImage } = req.body;

    // Validate input fields
    if (
      !productName ||
      !newPrice ||
      !unitsInStock ||
      !category ||
      !reviews ||
      !rating ||
      !description ||
      !shortDescription ||
      productImages.length === 0 
      // !type 
    ) {
      return res.status(500).json({ error: "please fill all the fields!" });
    }

    const uploadedImages = await Promise.all(
      productImages.map(async (image) => {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "dream bazar",
        });
        return uploadedImage.secure_url;
      })
    );

    // Upload productImage and hoverImage to Cloudinary
    if (productImage) {
      const productImageUpload = await cloudinary.uploader.upload(productImage, {
        folder: "dream bazar", // Cloudinary folder name
      });
      productImage = productImageUpload.secure_url;
    }

    if (hoverImage) {
      const hoverImageUpload = await cloudinary.uploader.upload(hoverImage, {
        folder: "dream bazar", // Cloudinary folder name
      });
      hoverImage = hoverImageUpload.secure_url; // Save Cloudinary hover image URL
    }

    // Create a new product
    const newProduct = new InCommingProduct({
      productName,
      discount,
      newPrice,
      oldPrice,
      productImage, // Save Cloudinary image URL
      hoverImage,
      productImages: uploadedImages,
      unitsInStock,
      description,
      shortDescription,
      category,
      reviews,
      rating,
      videoUrl, // Added video URL to payload
      brand,
      type,
      size,
      quality,
      colors,
      warranty
    });

    // Save the product to the database
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const {
      productName,
      discount,
      newPrice,
      oldPrice,
      unitsInStock,
      category,
      reviews,
      rating,
      description,
      shortDescription,
      productImage, // Directly from request body
      hoverImage, // Directly from request body
      productImages, // Array of URLs
      videoUrl, // Added video URL to payload
      colors,
      warranty,
      brand,
      type,
      size,
      quality
    } = req.body;

    // Find the product in the appropriate collection
    const product = (await InCommingProduct.findById(productId)) || (await BestSelling.findById(productId));
    if (!product) {
      return res.status(404).json({ error: "No product found for this id." });
    }

    // Update product fields
    product.productName = productName;
    product.discount = discount;
    product.newPrice = newPrice;
    product.oldPrice = oldPrice;
    product.unitsInStock = unitsInStock;
    product.description = description;
    product.shortDescription = shortDescription;
    product.category = category;
    product.reviews = reviews;
    product.rating = rating;
    product.videoUrl = videoUrl; // Added video URL to payload
    product.brand = brand;
    product.type = type;
    product.size = size;
    product.quality = quality;
    product.colors = colors;
    product.warranty = warranty;
    // product.productImage = productImage; // Directly from request body
    

    // Only update productImage if a new one is provided
    if (productImage) {
      // If there's an existing image, delete it from Cloudinary
      if (product.productImage) {
        await cloudinary.uploader.destroy(product.productImage);
      }

      // Upload the new product image
      const productImageUpload = await cloudinary.uploader.upload(productImage, {
        folder: "dream bazar", // Cloudinary folder name
      });
      product.productImage = productImageUpload.secure_url; // Save Cloudinary image URL
    }

    // Only update hoverImage if a new one is provided
    if (hoverImage) {
      // If there's an existing hover image, delete it from Cloudinary
      if (product.hoverImage) {
        await cloudinary.uploader.destroy(product.hoverImage);
      }

      // Upload the new hover image
      const hoverImageUpload = await cloudinary.uploader.upload(hoverImage, {
        folder: "dream bazar", // Cloudinary folder name
      });
      product.hoverImage = hoverImageUpload.secure_url; // Save Cloudinary hover image URL
    }

    // Only update productImages array if new images are provided
    if (productImages && productImages.length > 0) {
      // Delete all existing product images from Cloudinary
      if (product.productImages && product.productImages.length > 0) {
        await Promise.all(product.productImages.map(async (img) => await cloudinary.uploader.destroy(img)));
      }

      // Upload the new product images
      const uploadedImages = await Promise.all(
        productImages.map(async (image) => {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "dream bazar", // Cloudinary folder name
          });
          return uploadResponse.secure_url; // Return the secure URL of the uploaded image
        })
      );

      product.productImages = uploadedImages; // Update the array of multiple images
    }

    // Save the updated product to the database
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const getAddedProducts = async (req, res) => {
  try {
    const products = await InCommingProduct.find({category:"New Arrival"}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const CreateBestSellingOrder = async (req, res) => {
  try {
    // Destructure and assign default values
    const {
      productName,
      discount,
      newPrice,
      oldPrice,
      unitsInStock,
      category,
      reviews,
      rating,
      description,
      type,
      productImages = [],
      productImage,
      hoverImage,
      shortDescription,
      videoUrl =[], // Added video URL to payload
      brand,
      size,
      quality,
      colors,
      warranty

    } = req.body;

    // Validate required fields
    if (
      !productName ||
      !newPrice ||
      !unitsInStock ||
      !category ||
      !reviews ||
      !rating ||
      productImages.length === 0 ||
      !shortDescription ||
      !type
    ) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }

    // Handle productImages upload
    const uploadedImages = await Promise.all(
      productImages.map(async (image) => {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "dream bazar",
        });
        return uploadedImage.secure_url;
      })
    );

    // Upload productImage and hoverImage to Cloudinary
    const uploadedProductImage = productImage
      ? await cloudinary.uploader
          .upload(productImage, {
            folder: "dream bazar",
          })
          .then((img) => img.secure_url)
      : null;

    const uploadedHoverImage = hoverImage
      ? await cloudinary.uploader
          .upload(hoverImage, {
            folder: "dream bazar",
          })
          .then((img) => img.secure_url)
      : null;

    // Create a new product entry in MongoDB
    const newProduct = new BestSelling({
      productName,
      discount,
      newPrice,
      oldPrice,
      productImages: uploadedImages,
      productImage: uploadedProductImage,
      hoverImage: uploadedHoverImage,
      unitsInStock,
      category,
      reviews,
      rating,
      description,
      shortDescription,
      type,
      videoUrl, // Added video URL to payload
      brand,
      size,
      quality,
      colors,
      warranty      
    });

    await newProduct.save(); // Save to the database

    // Send the created product as response
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      error: "Failed to add product. Please try again later.",
    });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    // Find product by category name
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ error: "Please provide a category name!" });
    }

    // Find products by category and sort them by createdAt descending
    const products = await InCommingProduct.find({ category }).sort({ createdAt: -1 });

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found for this category." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

export const getBestSellingProductsForAdmin = async (req, res) => {
  try {
    // Find all products except those with categories "Best Seller" or "New Arrival"
    const products = await BestSelling.find({
      category: { $nin: ["Best Seller", "New Arrival"] },
    }).sort({ createdAt: -1 });

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

export const getCustomGift = async (req, res) => {
  const { category } = req.params;
  try {
    if (!category) {
      return res.status(400).json({ error: "Please provide a category name!" });
    }
    const customGift = await BestSelling.find({ category }).sort({ createdAt: -1 });
    if (!customGift || customGift.length === 0) {
      return res.status(404).json({ error: "No products found for this category." });
    }
    res.status(200).json(customGift);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};
export const getBox = async (req, res) => {
  const { category } = req.params;
  try {
    if (!category) {
      return res.status(400).json({ error: "Please provide a category name!" });
    }
    const customGift = await BestSelling.find({ category }).sort({ createdAt: -1 });
    if (!customGift || customGift.length === 0) {
      return res.status(404).json({ error: "No products found for this category." });
    }
    res.status(200).json(customGift);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

export const AllProductForHomePage = async (req, res) => {
  try {
    const InCommingProducts = await InCommingProduct.find().sort({ createdAt: -1 });
    res.status(200).json(InCommingProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(404).json({ error: error.message });
  }
};

export const SingleProductForBestSellingAndEveryProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).json({ error: "Please provide a product id!" });
    }
    const product = (await BestSelling.findById(id)) || (await InCommingProduct.findById(id));
    if (!product) {
      return res.status(404).json({ error: "No product found for this id." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product." });
  }
};

export const DeleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Please provide a product id!" });
    }
    const deletedProduct = (await BestSelling.findByIdAndDelete(id)) || (await InCommingProduct.findByIdAndDelete(id));
    if (!deletedProduct) {
      return res.status(404).json({ error: "No product found for this." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product." });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
