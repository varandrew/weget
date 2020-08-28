/*
 * @Author: Varandrew
 * @Date: 2020-08-28 15:39:30
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-08-28 15:46:30
 * @Description: file content
 */
import weget, { Canceler } from '../../src/index'

const CancelToken = weget.CancelToken
const source = CancelToken.source()

weget.get('cancel/get', { cancelToken: source.token }).catch(err => {
  if (weget.isCancelled(err)) {
    console.log('request canceled', err.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')
  weget.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (weget.isCancelled(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

weget
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (weget.isCancelled(e)) {
      console.log('Request canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 200)
