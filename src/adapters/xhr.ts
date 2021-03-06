/*
 * @Author: Varandrew
 * @Date: 2020-02-29 17:17:43
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-08-27 11:12:48
 * @Description: file content
 */

import { WegetRequestConfig, WegetPromise, WegetResponse } from '@/types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: WegetRequestConfig): WegetPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function loadHandler() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: WegetResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function errorHandler() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function timeoutHandler() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response: WegetResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
