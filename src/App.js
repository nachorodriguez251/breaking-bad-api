import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Details from './components/details/Details'
import Main from './components/main/Main'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/character/:id">
          <Details />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
