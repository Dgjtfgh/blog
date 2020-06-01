import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'

function Main(){
    return (
        <Router>      
            <Route path="/" exact component={Login} />
            <Route path="/index/" exact component={Admin} />
        </Router>
    )
}

export default Main 