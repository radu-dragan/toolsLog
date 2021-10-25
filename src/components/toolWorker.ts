export const flatTolls = (allTools: any) => {
  const list: string[] = []
  Object.keys(allTools).forEach((key) => {
    Object.keys(allTools[key]).forEach((subkey) => {
      list.push([key, subkey].join('-'))
    })
    return null
  })
  return list
}

export const retriveTool = (id: string, data: any) => {
  const idRaw = id.split('-')
  return data[idRaw[0]][idRaw[1]]
}
