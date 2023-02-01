import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {message} from "antd";
import {__auth_token_key__, getToken, inspectTokenValidity} from "@/utils/token";

const targetPath = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: targetPath,
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  if (inspectTokenValidity()) {
    config.headers['Authorization'] = `Bearer ${getToken(__auth_token_key__)}`;
  }
  return config;
})

const request = <T>(config: AxiosRequestConfig) => {
  return new Promise<T>((resolve, reject) => {
    // axiosInstance.request(config.tsx).then(({status, data}: { status: number, data: Result<T> }) => {
    axiosInstance.request(config).then((response: AxiosResponse<Result<T>>) => {
      console.log(response)
      const {data, status} = response
      if (status >= 200 && status < 300 && data.success) {
        resolve(data.result!)
      } else {
        message.error(data.msg);
        reject(data);
      }
      // if (status >= 200 && status < 300 && data.success) {
      //   // @ts-ignore
      //   resolve(data.result);
      // } else {
      //   message.error(data.msg);
      //   reject(data);
      // }
    }, (err: Error) => {
      reject(err);
    });
  });
};
const METHOD = {
  GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE'
};

const postRequest = <T>(url: string, data?: Record<string, any>, params?: Record<string, any>) => {
  return request<T>({
    url, method: METHOD.POST, data, params
  });
};

const getRequest = <T>(url: string, params?: Record<string, any>) => {
  return request<T>({
    url, method: METHOD.GET, params
  });
};

const putRequest = <T>(url: string, data?: Record<string, any>) => {
  return request<T>({
    url, method: METHOD.PUT, data
  });
};

const deleteRequest = <T>(url: string, params?: Record<string, any>) => {
  return request<T>({
    url, method: METHOD.DELETE, params
  });
};

export default request;
export {getRequest, postRequest, putRequest, deleteRequest}
