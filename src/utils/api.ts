import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: window._env_.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setupAxios = () => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        const apiURL = `${window._env_.REACT_APP_REDIRECT_URI}/home`;
        if (window.location.href !== apiURL) {
          window.location.href = apiURL;
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
