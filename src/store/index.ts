import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

// --- data local --- //
const tool = require('../toolData/tools.json')
const consumables = require('../toolData/consumables.json')
const bike = require('../toolData/bikes.json')

const initialState = { ...tool, ...consumables, ...bike }

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
