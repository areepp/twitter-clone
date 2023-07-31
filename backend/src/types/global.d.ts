export type MediaAttachment = {
  id: number
  url: string
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
