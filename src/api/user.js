// 用户相关的请求模块
import request from "@/utils/request";
import store from "@/store";

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 请求验证码
export const getSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 请求用户自己的数据
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}