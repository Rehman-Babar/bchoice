import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import { v2 as cloudinary } from "cloudinary";
import InCommingProduct from "../models/InCommingProducts.js";

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

export const addProduct = async (req, res) => {
  try {
    const { productName, discount, newPrice, oldPrice, unitsInStock, category, reviews, rating } = req.body;

    let { productImage, hoverImage } = req.body;

    // Validate input fields
    if (!productName || !newPrice || !unitsInStock || !category || !reviews || !rating) {
      return res.status(500).json({ error: "please fill all the fields!" });
    }

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
      unitsInStock,
      category,
      reviews,
      rating,
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

export const getAddedProducts = async (req, res) => {
  try {
    const products = await InCommingProduct.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
