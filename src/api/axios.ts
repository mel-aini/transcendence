import axios, { AxiosInstance } from "axios";
import { BACKEND_END_POINT } from "../utils/global";

const api: AxiosInstance = axios.create({
	baseURL: BACKEND_END_POINT,
	withCredentials: true,
})

export default api;