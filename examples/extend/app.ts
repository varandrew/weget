/*
 * @Author: Varandrew
 * @Date: 2020-06-23 11:30:18
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-23 16:40:15
 * @Description: file content
 */

import weget from '../../src/index'

// weget({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// weget.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// weget.get('/extend/get')

// weget.options('/extend/options')

// weget.delete('/extend/delete')

// weget.head('/extend/head')

// weget.post('/extend/post', { msg: 'post' })

// weget.put('/extend/put', { msg: 'put' })

// weget.patch('/extend/patch', { msg: 'patch' })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return weget<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
