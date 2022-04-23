import axios, { AxiosInstance } from "axios";

export let axiosAPI: AxiosInstance;

export function configureAxios() {
  axiosAPI = axios.create({
    baseURL: "https://teatimechatapp.herokuapp.com/",
  });
}
// "https://teatimechatapp.herokuapp.com/"
