> pybbs前端项目，使用react, redux, react-router, axios 开发

服务端地址：https://github.com/tomoya92/pybbs

接口地址修改位置：`src/js/axios.js` 

```js
const Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.yiiu.co' : 'http://localhost:8080'
});
```

## 开始

运行

```sh
yarn install
yarn start # yarn start 启动的 NODE_ENV 是 development
```

构建

```sh
yarn install
yarn build # yarn build 后，部署运行后的 NODE_ENV 是 production
```

## 部署

nginx部署

```sh
# 假如构建好的build文件夹放在 /home/build
server {
  listen 5000;
  server_name localhost;
  location / {
    root /home/build;
    index index.html;
  }
}
```

serve命令运行

```sh
npm -g install serve
serve build
# 后台运行
nohup serve build &
```

## 贡献

欢迎大家提 issues 及 pr 

## 捐赠

![image](https://cloud.githubusercontent.com/assets/6915570/18000010/9283d530-6bae-11e6-8c34-cd27060b9074.png)
![image](https://cloud.githubusercontent.com/assets/6915570/17999995/7c2a4db4-6bae-11e6-891c-4b6bc4f00f4b.png)

如果觉得这个项目对你有帮助，欢迎捐赠！

## 开源协议

GNU AGPLv3