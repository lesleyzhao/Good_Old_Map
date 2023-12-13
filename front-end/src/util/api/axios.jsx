import axios from "axios"

const serverURL = import.meta.env.VITE_SERVER_URL;

// Axios for public routes (general art information)
const axiosProvider = axios.create({
  baseURL: serverURL,
  withCredentials: true
});

// Axios for private routes (sensitive user information)
const axiosPrivateProvider = axios.create({
  baseURL: serverURL,
  withCredentials: true
})

// Interceptor to add the Authorization header before each request
const authInterceptor = config => {
  const token = localStorage.getItem('token'); // Replace with your token retrieval logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Add the interceptor to axios instances
axiosPrivateProvider.interceptors.request.use(authInterceptor);

export default axiosProvider;
export {axiosPrivateProvider};