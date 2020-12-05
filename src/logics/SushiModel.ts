import Pos from '@/core/Pos'
import { SushiNeta } from './SushiAssets'

export default class SushiModel {
  id: string
  neta: SushiNeta
  initialPos: Pos
  constructor(neta: SushiNeta, initialPos?: Pos) {
    this.id = 'sushi-' + Math.random()
    this.neta = neta
    this.initialPos = initialPos ?? new Pos()
  }
}
