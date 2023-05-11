import axios from "axios";
import queryString from "query-string";
import StorageConstants from "../../constants/storage_constants";
import { apiBaseUrl } from "./api.url";

const baseURL = apiBaseUrl;

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(
        StorageConstants.tokenKey
      )}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
