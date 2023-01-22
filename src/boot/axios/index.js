import axios from "axios";
import store from "../../redux";
import handleErrors from "./_handleErrors";
import { axiosServer } from "../../constants/_server";

const token = localStorage.getItem("token");

axios.defaults.baseURL = `${axiosServer}/api/v2`;
axios.defaults.headers["Content-Type"] = "application/json";
if (token !== null) {
  axios.defaults.headers["x-auth-token"] = token;
}

const unLoadingUrl = ["/activity-logs/time"];
const v1Urls = ["/pub/categories", "/pub/videos"];

const handleLoading = (type = "", url = "", progress) => {
  unLoadingUrl.includes(url) || store.dispatch({ type, progress });
};

axios.interceptors.request.use(
  (request) => {
    handleLoading("SHOW_LOADING", request.url);
    if (v1Urls.some((e) => request.url.search(e) !== -1)) {
      request.baseURL = `${axiosServer}/api`;
    }
    request.onUploadProgress = (e) => {
      const { loaded, total } = e;
      const progress = Math.floor((loaded / total) * 100);
      handleLoading("SET_LOADING_PROGRESS", null, progress);
    };
    return request;
  },
  (error) => {
    handleLoading("SHOW_LOADING");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    handleLoading("HIDE_LOADING");
    return response;
  },
  (error) => {
    handleErrors(error);
    handleLoading("HIDE_LOADING");
    return Promise.reject(error);
  }
);

export default axios;
