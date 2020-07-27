/*
 * @Author: Varandrew
 * @Date: 2020-06-29 17:07:14
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-07-27 15:47:50
 * @Description: file content
 */

import { WegetRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, parseResponse } from './helpers/data'

const defaults: WegetRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return parseResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
