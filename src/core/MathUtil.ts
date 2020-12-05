export const r2a = (r: number) => (r / Math.PI) * 180
export const a2r = (a: number) => (a / 180) * Math.PI

export const rundomFrom = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)]
