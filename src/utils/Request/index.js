import Axios from "axios";
//process.env.REACT_APP_API_URL
//process.env.REACT_APP_TEST_URL
const API_URL = process.env.REACT_APP_TEST_URL;
export default {
  get: async (url, params = {}, options = {}) => {
    const headers = {
      authorization: `Bearer ${await localStorage.getItem("token")}`,
    };
    const response = await Axios.get(`${API_URL}${url}`, {
      headers,
      params,
      ...options,
    });
    return response;
  },
  post: async (url, payload, options = {}) => {
    const headers =
      localStorage.getItem("authorization") &&
      localStorage.getItem("authorization") !== "null"
        ? { authorization: localStorage.getItem("authorization") }
        : {};
    const response = await Axios.post(`${API_URL}${url}`, payload, {
      headers,
      ...options,
    });
    //console.log(process.env.REACT_APP_API_URL);
    return response;
  },
  put: async (url, payload, options = {}) => {
    const headers = {
      authorization: `Bearer ${await localStorage.getItem("token")}`,
    };
    const response = await Axios.put(`${API_URL}${url}`, payload, {
      headers,
    });
    return response;
  },
  delete: async (url, params = {}, options = {}) => {
    const headers =
      localStorage.getItem("authorization") &&
      localStorage.getItem("authorization") !== "null"
        ? { authorization: localStorage.getItem("authorization") }
        : {};
    const response = await Axios.delete(`${API_URL}${url}`, {
      headers,
      params,
      ...options,
    });
    return response;
  },
};
