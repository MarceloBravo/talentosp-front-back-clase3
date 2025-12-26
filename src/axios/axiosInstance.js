import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  
});

instance.interceptors.request.use(
  (config) => {
    /*
    config.headers = {
      ...config.headers,
      'x-rapidapi-key': 'b4536fc67emsh031c45c76b26cb3p1bf453jsne532288abdad',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    };
    */
    config.params = {
      ...config.params,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default instance;