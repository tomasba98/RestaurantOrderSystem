import { ApiClient } from "./ApiClient";

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');