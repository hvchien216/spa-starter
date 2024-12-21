import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class AxiosRequest {
  private _instance: AxiosInstance;

  constructor() {
    this._instance = this._createInstance();
    this._setupInterceptors();
  }

  private _createInstance(): AxiosInstance {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private _setupInterceptors() {
    this._instance.interceptors.request.use(this._handleRequest.bind(this));
    this._instance.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private async _handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    return config;
  }

  private _handleResponse(response: AxiosResponse): any {
    const { data } = response;
    return data instanceof Blob ? data : data;
  }

  private _handleError(error: any): Promise<never> {
    if (axios.isCancel(error)) {
      // Handle request cancellation logic if needed
    }
    return Promise.reject(error);
  }

  public getInstance(): AxiosInstance {
    return this._instance;
  }
}

export default new AxiosRequest();
