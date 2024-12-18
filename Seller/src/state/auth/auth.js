import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Helper Functions
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


// Async Thunks
export const signup = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`,
      credentials
    );
    toast.success("Account created successfully");
    localStorage.setItem("user", JSON.stringify(data.user));
    
    return data.user;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Signup failed";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
      credentials
    );
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Login failed";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`);
    toast.success("Logged out successfully");
    localStorage.removeItem("user");
    return null;
  } catch (error) {
    const errorMessage = error.message || "Logout failed";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const authCheck = createAsyncThunk("auth/authCheck", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/me`);
    return data.user;
  } catch (error) {
    const user = loadUserFromLocalStorage();
    if (user) return user;
    const errorMessage = "Failed to verify authentication status";
    return rejectWithValue(errorMessage);
  }
});
// TODO
export const signUpBuyer = createAsyncThunk(
  "auth/signUpBuyer",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v2/auth/buyer/admin/signup`,
        payload
      );
      toast.success("Buyer signed up successfully");
      // localStorage.setItem("user", JSON.stringify(data.user));
       // 2 hours expiry
      return data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Buyer signup failed.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const submitSellerRequest = createAsyncThunk(
  "auth/submitSellerRequest",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v2/auth/seller/admin/signup/special/adminseller/request`,
        formData
      );
      toast.success("Seller request submitted successfully");
      // localStorage.setItem("user", JSON.stringify(data.user));
      setWithExpiry("user", data.user, 1); 
      
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Submission failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const sellerLogin = createAsyncThunk(
  "auth/sellerLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v2/auth/seller/admin/login/request`,
        { email, password }
      );
      toast.success("Seller logged in successfully");
      // localStorage.setItem("user", JSON.stringify(data.user));
      setWithExpiry("user", data.user, 1); // 2 hours expiry
      console.log(data.user);
      return data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginBuyer = createAsyncThunk(
  "auth/loginBuyer",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v2/auth/buyer/admin/login`,
        payload
      );  
      toast.success("Buyer logged in successfully");
      // localStorage.setItem("user", JSON.stringify(data.user));
      setWithExpiry("user", data.user, 1); // 2 hours expiry
      return data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Buyer login failed.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);



// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromLocalStorage(),  // Persisted user
    isSigningUp: false,               // General user signup state
    isLoggingIn: false,               // General user login state
    isLoggingOut: false,              // General user logout state
    isCheckingAuth: true,             // Authentication check state
    isBuyerSigningUp: false,          // Buyer signup state
    isBuyerLoggingIn: false,          // Buyer login state
    isSellerRequesting: false,        // Seller request state
    isSellerLoggingIn: false,         // Seller login state
    error: null,  
    showSuccessModal: false,          // Error message
  },
  reducers: {
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ** General Authentication **
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        state.error = action.payload || "Signup failed";
      })
  
      // Login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload || "Login failed";
      })
  
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload || "Logout failed";
      })
  
      // ** Buyer Authentication **
      .addCase(signUpBuyer.pending, (state) => {
        state.isBuyerSigningUp = true;
        state.error = null;
      })
      .addCase(signUpBuyer.fulfilled, (state, action) => {
        state.isBuyerSigningUp = false;
        state.user = action.payload;
      })
      .addCase(signUpBuyer.rejected, (state, action) => {
        state.isBuyerSigningUp = false;
        state.error = action.payload || "Buyer signup failed";
      })
      .addCase(loginBuyer.pending, (state) => {
        state.isBuyerLoggingIn = true;
        state.error = null;
      })
      .addCase(loginBuyer.fulfilled, (state, action) => {
        state.isBuyerLoggingIn = false;
        state.user = action.payload;
      })
      .addCase(loginBuyer.rejected, (state, action) => {
        state.isBuyerLoggingIn = false;
        state.error = action.payload || "Buyer login failed";
      })
  
      // ** Seller Authentication **
      .addCase(submitSellerRequest.pending, (state) => {
        state.isSellerRequesting = true;
        state.error = null;
      })
      .addCase(submitSellerRequest.fulfilled, (state, action) => {
        state.isSellerRequesting = false;
        state.showSuccessModal = true;  // Show success modal on success
        state.error = null;
      })
      .addCase(submitSellerRequest.rejected, (state, action) => {
        state.isSellerRequesting = false;
        state.error = action.payload || "Seller request failed";
      })
      .addCase(sellerLogin.pending, (state) => {
        state.isSellerLoggingIn = true;
        state.error = null;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.isSellerLoggingIn = false;
        state.user = action.payload;
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.isSellerLoggingIn = false;
        state.error = action.payload || "Seller login failed";
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
      });
  },
});

export const { setShowSuccessModal } = authSlice.actions;

export default authSlice.reducer;
