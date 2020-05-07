import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Link } from 'react-dom'

import './css/index.css'
import 'tachyons'

import Auth from './lib/Auth'

import Register from './components/Register'
import Login from './components/Login'
import Postcodes from './components/Postcodes'
import User from './components/User'
import Nav from './components/Nav'
import SingleRoute from './components/SingleRoute'


const App = () => {


  return <div>

    <HashRouter>
      <Nav />

      <Switch>
        <Route exact path = '/' component={Postcodes} />
        <Route exact path = '/user' component={User} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/route/:id' component={SingleRoute} />
      </Switch>
    </HashRouter>

  </div>

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)