import axios from 'axios'
// import { BASE_URL, TIMEOUT } from './config'

const instance = axios.create({
  // 默认的配置
  // baseURL: 'http://192.168.181:3000',
  baseURL: 'http://39.102.36.212:3001/',
  timeout: 2000,
  headers: {},
  withCredentials: true
})

instance.interceptors.request.use(
  // 请求拦截
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
    // 3.params/data序列化的操作
    return config
  },
  (err) => {
    console.log('err', err)
  }
)
instance.interceptors.response.use(
  // 响应拦截
  (res) => {
    return res.data
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('请求错误')
          break
        case 401:
          console.log('未授权访问')
          break
        default:
          console.log('其他错误信息')
      }
    }
    return err
  }
)

export default instance
