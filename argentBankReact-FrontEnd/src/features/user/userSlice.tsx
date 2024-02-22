// userSlice.tsx
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiService } from "./apiServices";
import { setToken, removeToken } from "../../utility/token";

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiService.login({ email, password });
      console.log("Login response:", response);
      localStorage.setItem("token", response.body.token);
      if (response.body.token) {
        setToken(response.body.token);
      }
      return { user: response.user, token: response.body.token };
    } catch (error) {
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).user.token;
    console.log("Token for profile REQUEST:", token);
    if (token) {
      try {
        const response = await apiService.getProfile(token);
        return response;
      } catch (error) {
        return rejectWithValue("An error occurred while fetching profile");
      }
    } else {
      return rejectWithValue("No token found");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData: { firstName: string; lastName: string }, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const updatedUserData = await apiService.profileUpdate(userData, token);
      console.log("Profile update response:", updatedUserData); // Debugging
      thunkAPI.dispatch(fetchUserProfile());
      return updatedUserData;
    } catch (error) {
      console.error("Update profile error:", error); // Debugging
      return thunkAPI.rejectWithValue(
        "An error occurred while updating profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      removeToken();
    },
    setTokenInState: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        // Use type assertion to inform TypeScript about the payload's structure
        const errorMessage = (action.payload as { message?: string })?.message;
        state.error = errorMessage !== undefined ? errorMessage : null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log("Profile updated:", action.payload);
        state.user = action.payload;
      });
  },
});

export const { signOut, setTokenInState } = userSlice.actions;
export default userSlice.reducer;
