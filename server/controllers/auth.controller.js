import { UserModal } from '../models/User.Modal.js';
import bcrypt from 'bcryptjs'

import jwttokenAndSetCookie from '../hooks/GenrateToken.js'
// SignUp Controller
export const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
 
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields!" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const existedUser = await UserModal.findOne({ username });
        if (existedUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        const existedEmail = await UserModal.findOne({ email });
        if (existedEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profileImg = [ "/avatar3.png"];
        const image = profileImg[Math.floor(Math.random() * profileImg.length)];
        const newUser = new UserModal({
            username,
            email,
            password: hashedPassword,
            image
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

// Login Controller
export const Login = async (req, res) => {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password" });
        }

        // Check if user exists in the database
        const user = await UserModal.findOne({ email });
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

// // Logout Controller
export const Logout =async (req, res) => {
try {
    res.cookie("jwtAdmin", "", {maxAge:0})
    return res.status(200).json({success:true, message:"Logout Success Successfully"})
} catch (error) {
    console.log("Error in logout controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
}
}

export const GetMe = async (req, res) => {
    try {
        // Find user by ID and exclude the password field
        const user = await UserModal.findById(req.user?._id).select("-password");

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


