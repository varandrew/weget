/*
 * @Author: Varandrew
 * @Date: 2020-07-09 13:38:20
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-07-27 16:51:05
 * @Description: file content
 */

import qs from 'qs'
import weget, { WegetTransformer } from '../../src/index'

weget.defaults.headers.common['test2'] = 123

// weget({
//   url: '/config/post',
//   method: 'post',
//   data: { a: 1 },
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res.data)
// })

weget({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(weget.defaults.transformRequest as WegetTransformer[])
  ],
  transformResponse: [
    ...(weget.defaults.transformResponse as WegetTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
