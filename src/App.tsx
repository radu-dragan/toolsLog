import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingTool } from './pages/LandingTool'
import { StorePage } from './pages/StorePage'
import { SubTool } from './pages/SubTool'
import { ToolID } from './pages/ToolItemPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/subTools/:toolId/" component={SubTool} />
        <Route path="/storage/:toolId/" component={StorePage} />
        <Route path="/:toolId/" component={ToolID} />
        <Route path="/" exact>
          <LandingTool />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
