import Axios from "axios";
//process.env.REACT_APP_API_URL
//process.env.REACT_APP_TEST_URL
const API_URL = process.env.REACT_APP_RENEWAL_TEST_URL;
export default {
  get: async (url, params = {}, options = {}) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("oldUserToken")}`,
    };
    const response = await Axios.get(`${API_URL}${url}`, {
      headers,
      params,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
      ...options,
    });
    return response;
  },
  post: async (url, payload, options = {}) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("oldUserToken")}`,
    };
    const response = await Axios.post(`${API_URL}${url}`, payload, {
      headers,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
      ...options,
    });
    //console.log(process.env.REACT_APP_API_URL);
    return response;
  },
  put: async (url, payload, options = {}) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("oldUserToken")}`,
    };
    const response = await Axios.put(`${API_URL}${url}`, payload, {
      headers,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });
    return response;
  },
  delete: async (url, params = {}, options = {}) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("oldUserToken")}`,
    };

    const response = await Axios.delete(`${API_URL}${url}`, {
      headers,
      params,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
      ...options,
    });
    return response;
  },
};
