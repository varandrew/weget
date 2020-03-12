/*
 * @Author: Varandrew
 * @Date: 2020-02-29 17:17:43
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-02-29 18:11:51
 * @Description: file content
 */

import { WegetRequesetConfig } from '../types'

export default function xhr(payload: WegetRequesetConfig) {
  const { url, data = null, method = 'get' } = payload

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
