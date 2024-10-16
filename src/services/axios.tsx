import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com/api", //placeholder
  timeout: 10000, // Request timeout 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add Authorization header with the token, if it exists
    const token = localStorage.getItem("token"); // Or any other method you store tokens
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Optionally, you can modify config further
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // You can transform the response here if needed
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized: Token might be expired or invalid
        console.log("Unauthorized! Redirecting to login...");
        // Optionally, you can log out the user or redirect to login page
        localStorage.removeItem("token"); // Clear token if it's invalid
        window.location.href = "/login"; // Redirect to login
      } else if (status === 403) {
        // Forbidden: User doesn't have permission
        console.error("Access denied! You don't have the required permission.");
      } else if (status === 500) {
        // Internal server error
        console.error("Server error! Please try again later.");
      }
    }
    // Always return the error to the calling function
    return Promise.reject(error);
  }
);

export default api;
