import axios from "axios"
// TODO: store url in .env
const serverURL = "http://localhost:3000";

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