/*
 * @Author: Varandrew
 * @Date: 2020-02-29 12:02:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-02-29 12:14:47
 * @Description: file content
 */

import { Method } from '@/constants/index'

export interface WegetRequesetConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
