/*import axios from "axios";

const API = axios.create({
  baseURL: "https://vehicle-service-backend-fmet.onrender.com"
});

// Login API
export const login = (data) =>
  API.post(`/customers/login?email=${data.email}&password=${data.password}`);

// Register API
export const register = (data) =>
  API.post("/customers/register", data);

// Book service
export const bookService = (data) =>
  API.post("/booking/add", data);

// Get service history
export const getServiceHistory = (customerId) =>
  API.get(`/booking/history/${customerId}`);*/
import axios from "axios";

const API = axios.create({
  baseURL:"https://vehicle-service-backend-fmet.onrender.com"
});

export const login = (data) =>
  API.post("/api/login", data);

export const register = (data) =>
  API.post("/api/register", data);

export const bookService = (data) =>
  API.post("/booking/add", data);

export const getServiceHistory = (customerId) =>
  API.get(`/booking/history/${customerId}`);