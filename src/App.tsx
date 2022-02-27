import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LandingPage } from './pages/0_landingPage'
import { AppGrid } from './pages/app_grid'
import { GraphPage } from './pages/graph/graph'
import { GraphPage2 } from './pages/graph2/graph2'
import { GraphPageX } from './pages/graph_exeple/graph'
import { LandingTool } from './pages/LandingTool'
import { QueryPage } from './pages/queryListPage'
import { requiredTool } from './pages/requiredPage'
import { tablePage } from './pages/tablelPage/tabelPage'
import { ToolID } from './pages/ToolItemPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/graph/" component={GraphPage} />
        <Route path="/LandingTool/" component={LandingTool} />
        <Route path="/graphExemple2/" component={GraphPage2} />
        <Route path="/graphExemple/" component={GraphPageX} />
        <Route path="/graph/:toolId/:modifiers/" component={GraphPageX} />

        <Route path="/apps/grid/" component={AppGrid} />

        <Route path="/table/" component={tablePage} />
        <Route path="/requiredItems/:toolId/" component={requiredTool} />
        <Route path="/requiredItems/" component={requiredTool} />
        <Route path="/:category/:value/" component={QueryPage} />
        <Route path="/:toolId/" component={ToolID} />
        <Route path="/" component={LandingPage} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
