// src/services/apiService.ts
const API_URL = "http://localhost:3001/api/v1/user/";

interface LoginCredentials {
  email: string;
  password: string;
}
interface ProfileUpdateData {
  firstName: string;
  lastName: string;
}

const login = async (credentials: LoginCredentials) => {
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const data = await response.json();
  console.log("API response for login:", data);
  return data;
};

const getProfile = async (token: string) => {
  const response = await fetch(API_URL + "profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const data = await response.json();
  console.log("API response for getProfile:", data);
  return data.body;
};

const profileUpdate = async (
  profileUpdateData: ProfileUpdateData,
  token: string
) => {
  const response = await fetch(API_URL + "profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileUpdateData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();
  console.log("API response for profileUpdate:", data);
  return data;
};

export const apiService = {
  login,
  getProfile,
  profileUpdate,
};
