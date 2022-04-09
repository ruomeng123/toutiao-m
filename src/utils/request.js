// 封装axios请求模块
import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',  // 基础路径
  // baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径

  // transformResponse允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 转换成功则返回转换的数据
      return jsonBig.parse(data)
    } catch (err) {
      // 转换失败则直接返回该数据
      return data
    }
  }],
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 响应拦截器

export default request
