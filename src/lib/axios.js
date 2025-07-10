import axios from "axios";
import { toast } from "sonner";
// import store from "../redux/store.js";
// import { setUser } from "../redux/authSlice.js";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

// const navigate=useNavigate();

const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Attach JWT to each request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handling 401 and 403 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
    //   store.dispatch(setUser(null));
      localStorage.removeItem("token");
      toast.error("Session expired or unauthorized. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export default API;
