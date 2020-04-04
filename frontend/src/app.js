import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './css/index.css'
import 'tachyons'


import Register from './components/Register'



const App = () => {

  return <div>

    <HashRouter>

      <Switch>
        <Route exact path = '/' component={Register} />
      </Switch>
    </HashRouter>

  </div>

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)