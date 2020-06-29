/*
 * @Author: Varandrew
 * @Date: 2020-06-29 14:25:50
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-29 14:35:08
 * @Description: file content
 */

import weget from '../../src/index'

weget.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
weget.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
weget.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

weget.interceptors.response.use(res => {
  res.data += '1'
  return res
})

let interceptor = weget.interceptors.response.use(res => {
  res.data += '2'
  return res
})
weget.interceptors.response.use(res => {
  res.data += '3'
  return res
})

weget.interceptors.response.eject(interceptor)

weget({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})
