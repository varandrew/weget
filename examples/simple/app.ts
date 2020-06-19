/*
 * @Author: Varandrew
 * @Date: 2020-04-17 15:09:39
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-04-17 15:09:40
 * @Description: file content
 */

import weget from '../../src/index'

weget({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
