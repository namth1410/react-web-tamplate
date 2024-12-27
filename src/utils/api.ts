import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: window._env_.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxios = () => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJzdWIiOjQsInRva2VuVmVyc2lvbiI6MSwiaWF0IjoxNzM1MjkxNjEzLCJleHAiOjE3MzUyOTUyMTN9.J8pgp157Dn_-FyL2q2CboZogNPdEvn1nBAKOczLjnNE";
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      // Xử lý lỗi trong request
      return Promise.reject(error);
    }
  );
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
