import { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Trades from '../pages/Trades/Trades'
import Overview from '../pages/Overview/Overview'
import { Container } from '@material-ui/core'
import Navbar from './Navbar'
import Login from '../pages/Account/Login'
import Register from './RegisterDialog'
import PrivateRoute from './PrivateRoute'

// Since we are using graphql at this point, this component had to be abstracted out of App because graphQL needs a provider.
const Routes: FC = () => {
    return (
        <Router>
            <Navbar />
            <Container>
                <Switch>
                    <PrivateRoute exact path="/">
                        <Overview />
                    </PrivateRoute>
                    <PrivateRoute exact path="/trades">
                        <Trades />
                    </PrivateRoute>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                </Switch>
            </Container>
        </Router>
    )
}

export default Routes
