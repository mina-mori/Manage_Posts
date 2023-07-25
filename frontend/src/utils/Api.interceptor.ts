import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import environment from '../environments/environment';

export class ApiInterceptor {
  private static _instance: ApiInterceptor;
  private _axiosInstance: AxiosInstance;
  public constructor() {
    this._axiosInstance = axios.create({ baseURL: environment.baseUrl });
    this._axiosInstance.interceptors.request.use((config: any) => {
      let loader = document.getElementById('loader-layout');
      if (loader) {
        loader.style.visibility = 'visible';
      }
      return config;
    });
    this._axiosInstance.interceptors.response.use(
      (response) => {
        let loader = document.getElementById('loader-layout');
        if (loader) {
          loader.style.visibility = 'hidden';
        }
        return response;
      },
      (error: any) => {
        let loader = document.getElementById('loader-layout');
        if (loader) {
          loader.style.visibility = 'hidden';
        }
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
        }
        return Promise.reject(error);
      }
    );
  }
  public static getInstance() {
    if (!this._instance) {
      this._instance = new ApiInterceptor();
    }
    return this._instance;
  }
  private generateConfiguration = async (): Promise<
    AxiosRequestConfig | undefined
  > => {
    const token = localStorage.getItem('token');
    if (token && token !== '')
      return { headers: { Authorization: `Bearer ${token}` } };
    return { headers: {} };
  };

  public getData = async (url: string) => {
    try {
      const config = await this.generateConfiguration();
      const response = await this._axiosInstance.get(url, config);
      return response?.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  };
  public postData = async (url: string, data: any) => {
    try {
      const config = await this.generateConfiguration();
      const response = await this._axiosInstance?.post(url, data, config);
      return response?.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  };
  public putData = async (url: string, data: any) => {
    try {
      const config = await this.generateConfiguration();
      const response = await this._axiosInstance?.put(url, data, config);
      return response?.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  };
  public deleteData = async (url: string) => {
    try {
      const config = await this.generateConfiguration();
      const response = await this._axiosInstance?.delete(url, config);
      return response?.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  };
  public patchData = async (url: string, data: any) => {
    try {
      const config = await this.generateConfiguration();
      const response = await this._axiosInstance?.patch(url, data, config);
      return response?.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  };
}
