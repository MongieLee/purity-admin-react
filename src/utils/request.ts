import axios, {AxiosRequestConfig} from "axios";
import {message} from "antd";

const targetPath = "http://localhost:8080";

const preVersion = "/api/v1";

const axiosInstance = axios.create({
    baseURL: targetPath + preVersion,
    timeout: 3000,
});

function a(b:any){

}

const request = <T>(config: AxiosRequestConfig) => {
    return new Promise<Result<T>>((resolve, reject) => {
        axiosInstance.request(config).then(({status, data}: { status: number, data: Result<T> }) => {
            if (status >= 200 && status < 300 && data.success) {
                resolve(data);
            } else {
                message.error(data.msg);
                reject(data);
            }
        }, (err: Error) => {
            reject(err);
        });
    });
};

export default request;