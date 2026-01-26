// src/utils/request.ts
import axios from 'axios'

/**
 * 通用请求封装（无 UI 依赖）
 * - 自动携带 token
 * - 统一返回 data
 * - 错误通过 reject 抛出，由调用方处理
 */

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器：添加 token
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：只返回 data，错误统一 reject
request.interceptors.response.use(
  response => {
    return response.data // 直接返回业务数据
  },
  error => {
    // 可在此做基础日志记录（非 UI）
    console.error('API Error:', error.response?.data || error.message)

    // 抛出原始错误，让调用方决定如何提示用户
    return Promise.reject(error)
  }
)

export default request