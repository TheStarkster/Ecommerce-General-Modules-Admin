import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/login'
import Home from '../components/Home'

class Paths extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/Login" component={Login} />
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route path="*" component={() => "What're You Looking For? It's 404"} />
            </Switch>
        )
    }
}
export default Paths