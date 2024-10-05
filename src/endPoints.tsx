import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3005/api";
export const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const AUTHENTICATION_URLS = {
  regitser: `${baseURL}/auth/register`,
  login: `${baseURL}/auth/login`,
  forgetPassword: `${baseURL}/auth/forgot-password`,
  changePassword: `/auth/change-password`,
  resetPassword: `${baseURL}/auth/reset-password`,
};
