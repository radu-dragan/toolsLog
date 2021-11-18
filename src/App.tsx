import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingTool } from './pages/LandingTool'
import { RqguieTool } from './pages/requirePage'
import { StorePage } from './pages/StorePage'
import { SubTool } from './pages/SubTool'
import { ToolID } from './pages/ToolItemPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/needItems/" component={RqguieTool} />
        <Route path="/needItems/:toolId/" component={RqguieTool} />

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
