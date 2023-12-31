// src/services/apiService.ts
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

interface LoginCredentials {
  email: string;
  password: string;
}

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(API_URL + "login", credentials);
  return response.data;
};

const getProfile = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "profile", config);
  return response.data;
};

export const apiService = {
  login,
  getProfile,
};
