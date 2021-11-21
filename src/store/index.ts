import _ from 'lodash'
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

// --- data local --- //
const tool = require('../toolData/tools.json')
const consumables = require('../toolData/consumables.json')
const bike = require('../toolData/bikes.json')
const storage = require('../toolData/storage.json')

const initialState = {
  ...tool,
  ...consumables,
  ...bike,
  ...storage,
  logTools: {},
}
initialState.allTools = (() => {
  const list: string[] = []
  Object.keys(tool).forEach((key) => {
    Object.keys(tool[key]).forEach((subkey) => {
      list.push([key, subkey].join('-'))
    })
  })
  return list.sort()
})()

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
    // case 'countUP':
    //   return { ...state, value: state.value + 1 }
    // case 'countDown':
    //   return { ...state, value: state.value - 1 }
    default:
      return state
  }
}

const store = createStore(rootReducer, devToolsEnhancer({}))

export default store
