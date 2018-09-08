import axios from 'axios';
import qs from 'qs';

const Axios = axios.create({
  baseURL: 'http://localhost:8080'
});

Axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("accessToken");

Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === "post") {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // 如果返回的code是202，则表示token有问题，直接把登录信息清除
    if (res.data && res.data.code === 202) {
      localStorage.removeItem("username");
      localStorage.removeItem("Authorization");
      window.location.reload();
    } else if (res.data && res.data.code === 500) {
      res.data.description = "服务器异常";
    }
    return res;
  }
);

export default Axios