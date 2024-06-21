import axios from "axios"

const axiosClient = axios.create({
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(error);
});

export default axiosClient