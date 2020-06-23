/*
 * @Author: Varandrew
 * @Date: 2020-06-22 13:20:56
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-06-22 17:59:10
 * @Description: file content
 */

import { WegetInstance } from './types'
import Weget from './core/Weget'
import { extend } from './helpers/util'

function createInstance(): WegetInstance {
  const context = new Weget()
  const instance = Weget.prototype.request.bind(context)

  extend(instance, context)

  return instance as WegetInstance
}

const weget = createInstance()

export default weget
