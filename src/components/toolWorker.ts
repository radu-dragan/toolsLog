import _ from 'lodash'

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

export const selectTool = (id: string, data: any) => {
  const idRaw = id.split('-')
  return _.get(data, `[${idRaw[0]}][${idRaw[1]}]`)
}

export const selectToolTitle = (id: string, data: any) => {
  const idRaw = selectTool(id, data)
  return _.get(idRaw, 'title', null)
}
