// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Load user data from localStorage if available
const setWithExpiry = (key, value, expiryInHours) => {
  const now = new Date();
  // const expiryTime = now.getTime() + expiryInHours * 60 * 60 * 1000; // Milliseconds
  const expiryTime = now.getTime() + 1 * 60 * 60 * 1000; // 1 hour in milliseconds

  const item = {
    value: value,
    expiry: expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  // Check if the item is expired
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key); // Remove expired item
    return null;
  }
  return item.value;
};


const loadUserFromLocalStorage = () => {
  return getWithExpiry("user");
};

// Async thunk actions
export const signup = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/v1/auth/signup", credentials);
    toast.success("Account created successfully");
    // Save user to localStorage
    setWithExpiry("user", response.data.user, 1);
    return response.data.user;
  } catch (error) {
    toast.error(error.response?.data?.error || "Signup failed");
    return rejectWithValue(error.response?.data?.error || "Signup failed");
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://194.164.77.27:8000/api/v1/auth/login", credentials);
    // Save user to localStorage
    setWithExpiry("user", response.data.user, 1);
    return response.data.user;
  } catch (error) {
    toast.error(error.response?.data?.error || "Login failed");
    return rejectWithValue(error.response?.data?.error || "Login failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await axios.post("/api/v1/auth/logout");
    toast.success("Logged out successfully");
    // Remove user from localStorage
    localStorage.removeItem("admin user");
    return null;
  } catch (error) {
    toast.error(error.message || "Logout failed");
    return rejectWithValue(error.message || "Logout failed");
  }
});

export const authCheck = createAsyncThunk("auth/authCheck", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/v1/auth/me");
    return response.data.user;
  } catch (error) {
    const user = loadUserFromLocalStorage();
    console.log(user)
    if (user) {
      return user;
    } else {
      return rejectWithValue("Failed to verify authentication status");
    }
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromLocalStorage(),
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
        state.user = null;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoggingOut = false;
      })
      // Auth Check
      .addCase(authCheck.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isCheckingAuth = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
