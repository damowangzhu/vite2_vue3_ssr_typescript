import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) =>
    // 在发送请求之前做些什么
    config,
  (error) =>
    // 对请求错误做些什么
    Promise.reject(error)
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) =>
    // 对响应数据做点什么
    response.data || {},
  (error) => {
    // 对响应错误做点什么
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 500:
          // console.log(error.response.data);
          // Vue.prototype.$toast(error.response.data);
          break;
        case 404:
          // do something...
          break;
        default:
          // do something...
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
