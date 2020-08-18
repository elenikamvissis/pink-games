// React
import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

// CSS
import './App.css'

// Components
import Home from './Home'
import Memory from './memory'
import Minesweeper from './minesweeper'
import Navigation from './Navigation'
import Snake from './snake'

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/memory' component={Memory} />
        <Route path='/snake' component={Snake} />
        <Route path='/minesweeper' component={Minesweeper} />
      </Switch>
    </Router>
  )
}

export default App
