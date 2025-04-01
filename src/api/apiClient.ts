import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "./config";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.NYT_BASE_URL,
      params: {
        "api-key": API_CONFIG.NYT_API_KEY,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(
        `API Error: ${error.response.status} - ${error.response.statusText}`,
      );
    } else if (error.request) {
      return new Error("No response received from server");
    } else {
      return new Error(error.message);
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export default new ApiClient();
