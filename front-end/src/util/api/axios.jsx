import axios from "axios"
// TODO: store url in .env
const serverURL = "http://localhost:3000";

const axiosProvider = axios.create({
  baseURL: serverURL
});

export default axiosProvider;