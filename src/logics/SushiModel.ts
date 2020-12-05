import Pos from '@/core/Pos'

export default class SushiModel {
  id: string
  initialPos: Pos
  constructor(initialPos?: Pos) {
    this.id = 'sushi-' + Math.random()
    this.initialPos = initialPos ?? new Pos()
  }
}
