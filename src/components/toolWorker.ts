import _ from 'lodash'

export const getTool = ({
  id,
  store,
  props,
}: {
  id: string
  store: any
  props: string[]
}): any => {
  const idRaw = id.split('-')
  const toolData = _.get(store, `[${idRaw[0]}][${idRaw[1]}]`)
  if (props && props.length) {
    return _.pick(toolData, props)
  }
  return toolData
}

export const getToolsPropsValue = ({
  id,
  store,
  props,
}: {
  id: string[]
  store: any
  props: string
}): any => {
  const self: any = []
  id.forEach((element: string) => {
    const e = getTool({ id: element, store, props: [props] })
    if (e[props]) {
      self.push(e[props])
    }
  })

  return self
}

export const getToolsByProp = ({
  store,
  propertie,
  evaluator,
}: {
  store: any
  propertie: string
  evaluator: (e: any) => {}
}) => {
  const self: Array<any> = []
  store.allTools.forEach((x: string) => {
    const id = x.split('-')
    const toolData = _.get(store, id.join('.'))
    const toolPropData = _.get(toolData, propertie)
    const evalStatement = evaluator(toolPropData)
    if (evalStatement) {
      self.push({ ...toolData, id: x })
    }
  })
  return self
}

export const convertToLiter = (string: string) => {
  const self = string.split('x')
  return self.reduce((p: any, c: any) => p * +c, 1) / 1000
}

// legacy ---------------------------------------------

export const flatTolls = (allTools: any) => {
  const list: string[] = []
  Object.keys(allTools).forEach((key) => {
    Object.keys(allTools[key]).forEach((subkey) => {
      list.push([key, subkey].join('-'))
    })
    return null
  })
  return list.sort()
}

export const selectTool = (id: string, data: any) => {
  const idRaw = id.split('-')
  return _.get(data, `[${idRaw[0]}][${idRaw[1]}]`)
}

// TODO: 2 getTool (id, prop) replace

export const selectToolTitle = (id: string, data: any) => {
  const idRaw = selectTool(id, data)
  return _.get(idRaw, 'title', null)
}

// TODO: 3 I wat this in stare
export const flatSubTools = (allTools: any) => {
  let list: string[] = []

  Object.values(allTools).forEach((v1: any) => {
    Object.values(v1).forEach((v2: any) => {
      if (v2.subTools) {
        list.push(v2.subTools)
      }
    })
  })
  list = _.sortedUniq(_.flatten(list)).filter((x) => !!x)
  return list
}

// TODO: pass a funtion for filter
export const storedgeTools = (allTools: any) => {
  let list: string[] = []
  Object.values(allTools).forEach((v1: any) => {
    Object.values(v1).forEach((v2: any) => {
      if (v2.storage) {
        list.push(v2.storage)
      }
    })
  })

  list = _.sortedUniq(list.sort()).filter((x) => !!x)
  console.log(list)
  return list
}

// run a reduce on the get
export const fullPrice = (allTools: any) => {
  let total = 0
  Object.values(allTools).forEach((v1: any) => {
    Object.values(v1).forEach((v2: any) => {
      if (v2?.bothFrom?.price) {
        total += +v2?.bothFrom?.price
      }
    })
  })

  return total.toString()
}

export const filterSubtools = ({
  subTool,
  allTools,
}: {
  subTool: string
  allTools: any
}): any => {
  const list: string[] = []

  Object.keys(allTools).forEach((key) => {
    Object.keys(allTools[key]).forEach((subkey) => {
      if (allTools[key][subkey].subTools) {
        if (allTools[key][subkey].subTools.join(' ').indexOf(subTool) > -1) {
          list.push([key, subkey].join('-'))
        }
      }
    })
    return null
  })

  return list
}
