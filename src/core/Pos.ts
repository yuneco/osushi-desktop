export default class Pos {
  readonly x: number
  readonly y: number
  readonly r: number

  constructor(x = 0, y = 0, r = 0) {
    this.x = x
    this.y = y
    this.r = r
  }

  add(p: Pos) {
    return new Pos(this.x + p.x, this.y + p.y, this.r + p.r)
  }

  sub(p: Pos) {
    return new Pos(this.x - p.x, this.y - p.y, this.r + p.r)
  }

  addXY(x: number, y = 0, r = 0) {
    return new Pos(this.x + x, this.y + y, this.r + r)
  }
}
