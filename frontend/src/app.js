import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './css/index.css'
import 'tachyons'


import Register from './components/Register'
import TFLresult from './components/TFLresult'
import Postcodes from './components/Postcodes'



const App = () => {

  return <div>

    <HashRouter>

      <Switch>
        <Route exact path = '/enter' component={Postcodes} />
        <Route exact path = '/result' component={TFLresult} />
        
      </Switch>
    </HashRouter>

  </div>

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)