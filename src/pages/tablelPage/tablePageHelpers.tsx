import _ from 'lodash'

export const translateToolCode = (letter: string) => {
  switch (letter) {
    case 'A':
      return 'Tools'
    case 'CX':
      return 'Consumables'
    case 'BK':
      return 'Bikes'
    case 'X':
      return 'Storage'
    case 'Z':
      return 'Bags | crates'
    default:
      return letter
  }
}

export const allHeaderkeys = (items: any): any => {
  const runner = (full: any, item: any): string[] => {
    return _.union(full, Object.keys(item))
  }
  return Object.values(items).reduce(runner, [])
}
