export const isTool = (id: string) => {
  return id.startsWith('A')
}

export const isConsumable = (id: string) => {
  return id.startsWith('C')
}
