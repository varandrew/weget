/*
 * @Author: Varandrew
 * @Date: 2020-07-09 14:26:48
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-07-27 15:06:19
 * @Description: file content
 */

import { WegetTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: WegetTransformer | WegetTransformer[]
): any {
  if (!fns) return data
  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
