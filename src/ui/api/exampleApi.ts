import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 封装 GET 方法
const get = <T = unknown>(url: string, params?: unknown): Promise<T> => {
  return apiClient<T>({
    method: 'GET',
    url,
    params,
  });
};
const post = <T = unknown>(url: string, data?: unknown): Promise<T> => {
  return apiClient<T>({
    method: 'POST',
    url,
    data,
  });
};
export { get, post };

// export default apiClient;
