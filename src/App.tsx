import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingTool } from './pages/LandingTool'
import { StorePage } from './pages/StorePage'
import { SubTool } from './pages/SubTool'
import { ToolID } from './pages/ToolItemPage'

const toolData = require('./toolData/tools.json')

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/subTool/:toolId/" component={SubTool} />
          <Route path="/store/:toolId/" component={StorePage} />
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
