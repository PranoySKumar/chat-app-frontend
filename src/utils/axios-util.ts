import axios, { AxiosInstance } from "axios";

export let axiosAPI: AxiosInstance;

export function configureAxios() {
  axiosAPI = axios.create({
    baseURL: "https://teatimecornerbackend.onrender.com",
  });
}
// "https://teatimechatapp.herokuapp.com/"
