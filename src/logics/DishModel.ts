import { SushiNeta } from './SushiAssets'

export default class SushiModel {
  id: string
  neta: SushiNeta
  constructor(neta: SushiNeta) {
    this.id = 'sushi-' + Math.random()
    this.neta = neta
  }
}
