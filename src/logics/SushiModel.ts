import Pos from '@/core/Pos'

export default class SushiModel {
  id: string
  constructor() {
    this.id = 'sushi-' + Math.random()
  }
}
