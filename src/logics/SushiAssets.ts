export type SushiNeta =
  | 'uni'
  | 'toro'
  | 'tamago'
  | 'salmon'
  | 'neko'
  | 'maguro'
  | 'kohada'
  | 'ikura'
  | 'ika'
  | 'ebi'
export type DishColor = 'dishAka' | 'dishAo' | 'dishGin' | 'dishKin'

type SushiAsset = {
  color: DishColor
  name: string
}

export const sushiAssets: { [key in SushiNeta]: SushiAsset } = {
  maguro: {
    color: 'dishAka',
    name: 'MAGURO'
  },
  tamago: {
    color: 'dishAo',
    name: 'TAMAGO'
  },
  uni: {
    color: 'dishGin',
    name: 'UNI'
  },
  toro: {
    color: 'dishKin',
    name: 'TORO'
  },
  salmon: {
    color: 'dishAo',
    name: 'SALMON'
  },
  neko: {
    color: 'dishAo',
    name: 'NEKO'
  },
  kohada: {
    color: 'dishAo',
    name: 'KAHADA'
  },
  ikura: {
    color: 'dishGin',
    name: 'IKURA'
  },
  ika: {
    color: 'dishAka',
    name: 'IKA'
  },
  ebi: {
    color: 'dishAka',
    name: 'EBI'
  }
}

export const allNetas: SushiNeta[] = Object.keys(sushiAssets) as SushiNeta[]
