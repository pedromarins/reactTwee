import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

class Roteamento extends Component {
    render() {
        return(
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/login" component={LoginPage} />
            </Switch>
        )
    }
}

export default Roteamento;