// userSlice.ts

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiService } from "./apiServices";
import axios from "axios";

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

interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiService.login({ email, password });
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      const response = await apiService.getProfile(token);
      return response;
    }
    return rejectWithValue("No token found");
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
        (state, action: PayloadAction<LoginResponse>) => {
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
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        }
      );
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
