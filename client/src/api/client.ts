import axios from "axios";
import { csrfToken } from "./helpers/server-context";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://pure-depths-53034.herokuapp.com/api"
      : "http://localhost:3001/api",
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "X-CSRF-Token": csrfToken,
  },
});

const clientApi = {
  get: client.get,
  delete: client.delete,
  post: client.post,
  put: client.put,
  patch: client.patch,
};

Object.freeze(clientApi);

export default clientApi;
