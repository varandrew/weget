/*
 * @Author: Varandrew
 * @Date: 2020-02-29 11:39:05
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-02-29 18:13:02
 * @Description: file content
 */
import { WegetRequesetConfig } from '@/types/index'
import xhr from 'adapters/xhr'

function weget(payload: WegetRequesetConfig): void {
  // TODO
  xhr(payload)
}
export default weget
