import axios from "axios";
import { config } from "..";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptor";

export const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);
