import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { wait } from "./util";

export async function getByUrl<T>(url: string) {
  const response = await axios.get<T>(url);
  return response.data;
}

export async function sendRequest<T>(config: AxiosRequestConfig) {
  const response = await axios.request<T>(config);
  return response.data;
}

export async function exponentialRetry<T>(config: AxiosRequestConfig) {
  const MAX_RETRIES = 10;

  let response: AxiosResponse<T>
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      response = await axios.request<T>(config);
      console.log(response.status);
    } catch (err) {
      console.error(err);
    }
    if (response! && response.status < 500 && response.status !== 408 && response.status !== 429) {
      return response.data;
    }

    await wait(Math.pow(2, i));
  }
  // console.error(`Error: ${response!.status}->${response!.statusText}`);
}
