/*
 * @Author: Varandrew
 * @Date: 2020-08-20 14:18:10
 * @LastEditors: Varandrew
 * @LastEditTime: 2020-08-28 11:15:45
 * @Description: file content
 */
import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  public constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) return

      this.reason = new Cancel(message!)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) throw this.reason
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token: CancelToken = new CancelToken(c => (cancel = c))

    return {
      cancel,
      token
    }
  }
}
