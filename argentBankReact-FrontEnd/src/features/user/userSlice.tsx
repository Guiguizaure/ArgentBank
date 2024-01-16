import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiService } from "./apiServices";

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
    if (token) {
      try {
        const data = await apiService.profileUpdate(userData, token);
        thunkAPI.dispatch(fetchUserProfile()); // Use thunkAPI to dispatch
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          "An error occurred while updating profile"
        );
      }
    } else {
      return thunkAPI.rejectWithValue("No token found");
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
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<SerializedError>) => {
          state.status = "failed";
          state.error = action.payload.message || "An unknown error occurred";
        }
      )
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log("Profile updated:", action.payload);
        state.user = action.payload;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
