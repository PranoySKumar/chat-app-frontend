import axios, { AxiosInstance } from "axios";

export let axiosAPI: AxiosInstance;

export function configureAxios() {
  axiosAPI = axios.create({
    baseURL: "http://localhost:4000/",
  });
}
// "https://teatimechatapp.herokuapp.com/"
