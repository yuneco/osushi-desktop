export type SushiNeta = 'maguro' | 'tamago' | 'aji'
type SushiAsset = {
  color: string
  name: string
}

export const sushiAssets: { [key in SushiNeta]: SushiAsset } = {
  maguro: {
    color: 'salmon',
    name: 'MAGURO'
  },
  tamago: {
    color: 'gold',
    name: 'TAMAGO'
  },
  aji: {
    color: '#6e8d96',
    name: 'AJI'
  }
}
