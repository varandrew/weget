/*
 * @Author: Varandrew
 * @Date: 2020-02-29 12:02:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-19 09:27:31
 * @Description: file content
 */

import { Method } from '@/constants/index'

export interface WegetRequesetConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}

export interface WegetResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: WegetRequesetConfig
  request: any
}
