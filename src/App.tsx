import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LandingTool } from './pages/LandingTool'
import { QueryPage } from './pages/queryListPage'
import { requiredTool } from './pages/requiredPage'
import { tablePage } from './pages/tabelPage'
import { ToolID } from './pages/ToolItemPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/table/" component={tablePage} />
        <Route path="/requiredItems/:toolId/" component={requiredTool} />
        <Route path="/requiredItems/" component={requiredTool} />
        <Route path="/:category/:value/" component={QueryPage} />
        <Route path="/:toolId/" component={ToolID} />
        <Route path="/" exact>
          <LandingTool />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
