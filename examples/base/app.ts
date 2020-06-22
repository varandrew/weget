/*
 * @Author: Varandrew
 * @Date: 2020-06-18 13:07:14
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-19 11:16:41
 * @Description: file content
 */

import weget from '../../src/index'

const date = new Date()

weget({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

weget({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

weget({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

weget({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

weget({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

weget({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

weget({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

weget({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

weget({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

weget({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

weget({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res)
})
