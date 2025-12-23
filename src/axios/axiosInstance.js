import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const options = {
  method: 'GET',
  url: 'https://ebay32.p.rapidapi.com/product/195499451557',
  params: {
    country: 'germany',
    country_code: 'de'
  },
  headers: {
    'x-rapidapi-key': 'b4536fc67emsh031c45c76b26cb3p1bf453jsne532288abdad',
    'x-rapidapi-host': 'ebay32.p.rapidapi.com'
  }
};

const instance = axios.create(options);

instance.interceptors.request.use(
  (config) => {
    
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
    return Promise.reject(error);
  }
);

export default instance;