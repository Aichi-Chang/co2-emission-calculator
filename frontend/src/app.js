import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './css/index.css'
import 'tachyons'


import Register from './components/Register'
import Login from './components/Login'
import Postcodes from './components/Postcodes'
import User from './components/User'


const App = () => {

  return <div>

    <HashRouter>

      <Switch>
        <Route exact path = '/' component={Postcodes} />
        <Route exact path = '/user/:id' component={User} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </HashRouter>

  </div>

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)