/*
 * @Author: Varandrew
 * @Date: 2020-02-29 17:17:43
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-18 17:35:35
 * @Description: file content
 */

import { WegetRequesetConfig } from '../types'

export default function xhr(payload: WegetRequesetConfig) {
  const { url, data = null, method = 'get', headers } = payload

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
