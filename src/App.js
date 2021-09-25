import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Details from './components/details/Details'
import Main from './components/main/Main'
import PageNotFound from './components/page-not-found/PageNotFound'

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
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
