import { AxiosInstance, AxiosRequestConfig } from 'axios';
import AxiosRequest from './axios-base';

class HttpRequest {
  _baseRequest: AxiosInstance;
  constructor(baseRequest: AxiosInstance) {
    this._baseRequest = baseRequest;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return this._baseRequest.get(url, config);
  }

  async post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this._baseRequest.post(url, data, config);
  }
}

export default new HttpRequest(AxiosRequest.getInstance());
