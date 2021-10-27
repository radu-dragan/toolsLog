import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingTool } from './pages/LandingTool'
import { ToolID } from './pages/ToolItemPage'

// #TODO Store
// https://redux.js.org/api/store
const toolData = require('./toolData/tools.json')

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="container">
        <Switch>
          <Route path="/:toolId/" component={ToolID} />
          <Route path="/" exact>
            <LandingTool data={toolData} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
