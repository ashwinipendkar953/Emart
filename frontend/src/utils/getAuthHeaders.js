// utils/apiHelper.js

// Helper to get the token and configure headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token || token === null) {
    throw new Error("Please Login...!");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};
