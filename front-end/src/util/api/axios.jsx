import axios from "axios"

const serverURL = import.meta.env.VITE_SERVER_URL

const axiosProvider = axios.create({
  baseURL: serverURL,
  withCredentials: true
});

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

// Adding the interceptor to axios instances
axiosProvider.interceptors.request.use(authInterceptor);
axiosPrivateProvider.interceptors.request.use(authInterceptor);

export default axiosProvider;
export {axiosPrivateProvider};