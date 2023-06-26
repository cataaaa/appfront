import axios from "axios";

//const baseURL = "http://CENWAPPRD02:5010";
const baseURL = "http://localhost:5010";

const Api = axios.create({ baseURL });
Api.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    // config.headers["content-type"] = "application/x-www-form-urlencoded";
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const ApiFiles = axios.create({ baseURL });
ApiFiles.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    config.headers["Content-Type"] = "multipart/form-data";
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default { Api, ApiFiles };
