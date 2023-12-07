import axios from "axios"

const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
// const serverURL = "http://localhost:3000";
console.log('Server URL:', import.meta.env );
const axiosProvider = axios.create({
  baseURL: serverURL,
  withCredentials: true
});

// const axiosProvider = axios.create({
//   baseURL: 'https://us-east-1.aws.data.mongodb-api.com/app/data-fzvrf/endpoint/data/v1',
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Request-Headers': '*',
//     'api-key': 'import.meta.env.MONGODB_API_KEY'
//   }
// });

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