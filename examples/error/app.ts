/*
 * @Author: Varandrew
 * @Date: 2020-06-19 15:16:07
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-22 13:34:49
 * @Description: file content
 */

import weget, { WegetError } from '../../src/index'

weget({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

weget({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

setTimeout(() => {
  weget({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}, 5000)

weget({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e.message)
  })

weget({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: WegetError) => {
    console.log(e.message)
    console.log(e.code)
  })
