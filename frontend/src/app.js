import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './css/index.css'
import 'tachyons'


import Register from './components/Register'
import Homepage from './components/Homepage'



const App = () => {

  return <div>

    <HashRouter>

      <Switch>
        <Route exact path = '/' component={Homepage} />
      </Switch>
    </HashRouter>

  </div>

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)