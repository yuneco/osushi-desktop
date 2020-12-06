import { DishColor, SushiNeta } from './SushiAssets'

export default class SushiModel {
  id: string
  neta: SushiNeta
  color: DishColor
  picked = false

  constructor(neta: SushiNeta, color: DishColor) {
    this.id = 'sushi-' + Math.random()
    this.neta = neta
    this.color = color
  }
}
