import _ from 'lodash'
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

// --- data local --- //
const tool = require('../toolData/tools.json')
const consumables = require('../toolData/consumables.json')
const bike = require('../toolData/bikes.json')
const storage = require('../toolData/storage.json')

const getAllItems = (item: any) => {
  const list: string[] = []
  Object.keys(item).forEach((key) => {
    Object.keys(item[key]).forEach((subkey) => {
      list.push([key, subkey].join('-'))
    })
  })
  return list.sort()
}

const initialState = {
  ...tool,
  ...consumables,
  ...bike,
  ...storage,
  logTools: {},
}
initialState.allTools = getAllItems(tool)
initialState.allConsumables = getAllItems(consumables)

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        logTools: { ...state.logTools, ...action.item },
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        logTools: _.omit(state.logTools, action.item),
      }
    case 'ADD_ITEM_OPTION':
      const { logTools } = state
      logTools[action.item.id] = { ...logTools[action.item.id], ...action.item }

      return {
        ...state,
        logTools,
      }
    default:
      return state
  }
}

const store = createStore(rootReducer, devToolsEnhancer({}))

export default store
