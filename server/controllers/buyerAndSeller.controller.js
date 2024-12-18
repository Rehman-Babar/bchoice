import jwttokenAndSetCookie from "../hooks/GenrateToken.js";
import { BuyerAndSeller } from "../models/buyerAndSeller.js";
import cloudinary from 'cloudinary';
import bcrypt from 'bcryptjs'

export const BuyerSignup = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, country  } = req.body;
        if (!fullName || !email || !password || !phoneNumber || !country) {
            return res.status(400).json({ error: "Please fill all the fields!" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const existedUser = await BuyerAndSeller.findOne({ fullName });
        if (existedUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        const existedEmail = await BuyerAndSeller.findOne({ email });
        if (existedEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profileImg = [ "/avatar3.png"];
        const image = profileImg[Math.floor(Math.random() * profileImg.length)];
        const newUser = new BuyerAndSeller({
            fullName,
            email,
            password: hashedPassword,
            image,
            phoneNumber,
            country,
            role:`buyer`,
            accessRequests:  [
                {
                  text: "Dashboard",
                  icon: "<HomeOutlined />",
                  route: "/dashboard",
                },
                // {
                //   text: "All Orders",
                //   icon: <ShoppingCartCheckoutIcon />,
                //   items: [
                //     { text: "All Orders", route: "/orders" },
                //     { text: "New Arrivals", route: "/new arrivals" },
                //     { text: "Customize Gifts", route: "/custom gift" },
                //   ],
                // },
                // {
                //   text: "All Products",
                //   icon: <AddIcon />,
                //   items: [
                //     { text: "All Products", route: "/list/all products" },
                //     { text: "Custom Gift", route: "/list/custom gifts" },
                //     { text: "New Arrival", route: "/productspage" },
                //     { text: "Best Seller", route: "/productspage/bestseller" },
                //   ],
                // },
                {
                  text: "Management",
                  icon: "<AddIcon />",
                  items: [
                    { text: "Revenues", route: "/revenues" },
                    { text: "Expenses", route: "/expenses" },
                    { text: "All Team", route: "/all-team" },
                    { text: "Tasks", route: "/tasks" },
                  ],
                },
                {
                  text: "Payments",
                  icon: "<AddIcon />",
                  items: [
                    { text: "Withdraw Requests", route: "/withdraw-requests" },
                    { text: "Withdraw History", route: "/withdraw-history" },
                    { text: "All Team", route: "/all-team" },
                    { text: "Tasks", route: "/tasks" },
                  ],
                },
            ]
        });
        if (newUser) {
            jwttokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({success:true, user:{
                ...newUser._doc,
                password:""
            }});
        } else {
        return res.status(500).json({ error: "Invalied user data." });
        }
        
    } catch (error) {
        console.log("Error in signup controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateSeller = async (req, res) => {
    const id = req.params.id;
    const { accessRequests } = req.body;

    // Validate ID

    // Validate accessRequests
    if (!accessRequests || !Array.isArray(accessRequests)) {
        return res.status(400).json({ error: "Invalid or missing accessRequests" });
    }

    try {
        
        const updatedUser = await BuyerAndSeller.findByIdAndUpdate(
            id,
            {
                accessRequests,
                accessApproved: true,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating seller:", {
            error: error.message,
            stack: error.stack,
        });
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login Controller
export const buyerLogin = async (req, res) => {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password" });
        }

        // Check if user exists in the database
        const user = await BuyerAndSeller.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare password with the stored hash
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate and set JWT token as an HTTP-only cookie
        jwttokenAndSetCookie(user._id, res);

        // Return user data without password field
        return res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""  // Remove password from the response for security
            }
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const SellerSignup = async (req, res) => {
    try {
        const { 
            fullName, 
            email, 
            password, 
            phoneNumber, 
            country, 
            profession, 
            image, // The image should be a base64 or URL
            userName, 
            fatherName, 
            cnic, 
            exactLocation 
        } = req.body;

        // Check for required fields
        if (!fullName || !email || !password || !phoneNumber || !country || !image || !profession || !userName || !fatherName || !cnic || !exactLocation) {
            return res.status(400).json({ error: "All fields are required ??" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if username or email is already taken
        const [existedUser, existedEmail] = await Promise.all([
            BuyerAndSeller.findOne({ userName }),
            BuyerAndSeller.findOne({ email })
        ]);
        if (existedUser) {
            return res.status(400).json({ error: "Username already taken" });
        }
        if (existedEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let cloudinaryResult;
        try {
            cloudinaryResult = await cloudinary.v2.uploader.upload(image, {
                folder: 'users/profiles', // Optional folder in Cloudinary
            });
        } catch (error) {
            return res.status(500).json({ error: "Error uploading image to Cloudinary" });
        }

        // Create new user
        const newUser = new BuyerAndSeller({
            fullName,
            email,
            password: hashedPassword,
            image: cloudinaryResult.secure_url, // Save the Cloudinary URL
            phoneNumber,
            country,
            profession,
            role: "seller",
            userName,
            fatherName,
            cnic,
            exactLocation,
        });

        // Save user and generate token
        await newUser.save();
        jwttokenAndSetCookie(newUser._id, res);

        return res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "" // Exclude sensitive data
            }
        });
    } catch (error) {
        console.error("Error in SellerSignup:", error.message);
        return res.status(500).json({ error: "Full Name already exist" }); 
    }
};


export const SellerLogin = async (req, res) => {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password" });
        }

        // Check if user exists in the database
        const user = await BuyerAndSeller.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare password with the stored hash
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate and set JWT token as an HTTP-only cookie
        jwttokenAndSetCookie(user._id, res);

        // Return user data without password field
        return res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""  // Remove password from the response for security
            }
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await BuyerAndSeller.find({}).sort({ createdAt: -1 }) // Sort by createdAt, newest first
  
      res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to get users." });
    }
  };
  

// get me

export const GetMe = async (req, res) => {
    try {
        // Find user by ID and exclude the password field
        const user = await BuyerAndSeller.findById(req.user?._id).select("-password");

        if (!user) {
            // Return a 404 status if the user is not found
            return res.status(404).json({ error: "User not found" });
        }

        // Return the user information as a response
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error in GetMe controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// workingStatus
export const changeworkingStatus = async (req, res) => {
    const { workingStatus } = req.body;
    const { id } = req.params;
    console.log(workingStatus, id);

    try {
        const updatedUser = await BuyerAndSeller.findByIdAndUpdate(
            id,
            { workingStatus },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error in changeworkingStatus controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deletseller = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the order in the database
      const deletedOrder = await BuyerAndSeller.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      // Success response
      res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };









