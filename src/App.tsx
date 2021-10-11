import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { LandingTool } from './pages/LandingTool'
import { ToolID } from './pages/ToolID'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={LandingTool} exact />
          <Route path="/old" component={Home} exact />
          <Route path="/about" component={About} />

          <Route path="/:toolId" component={ToolID} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
