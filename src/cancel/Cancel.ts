export default class Cancel {
  message?: string

  public constructor(message: string) {
    this.message = message
  }
}

export function isCancelled(value: any): boolean {
  return value instanceof Cancel
}
